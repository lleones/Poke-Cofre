import request from 'supertest'
import jwt from 'jsonwebtoken'
import { afterAll, beforeEach, describe, expect, test, jest } from '@jest/globals'
import sequelize from '../../config/db'
import app from '../../app'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'chave_de_fallback'
jest.setTimeout(30000)

const waitForSequelize = async () => {
  try {
    await sequelize.authenticate()
  } catch {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return waitForSequelize()
  }
}

beforeEach(async () => {
  await waitForSequelize()
  await sequelize.sync({ force: true })
})

afterAll(async () => {
  await sequelize.close()
})

const generateToken = (id: string, nome: string) => {
  return jwt.sign({ id, nome }, JWT_SECRET, { expiresIn: '1h' })
}

describe("Treinador API Integration Tests", () => {
  test("POST /treinadores - Criação de Treinador (sucesso)", async () => {
    const payload = { nome: "Ash", senha: "pikachu123" }
    const res = await request(app)
      .post("/treinadores")
      .send(payload)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payload.nome)
    expect(res.body).toHaveProperty("id")
  })

  test("POST /treinadores - Criação de Treinador (falha: dados ausentes)", async () => {
    const res = await request(app)
      .post("/treinadores")
      .send({})
    expect(res.status).not.toBe(201)
  })

  test("POST /treinadores - Criação de Treinador (erro interno)", async () => {
    const payload = { nome: "Erro", senha: "123" }
    const { TreinadorService } = await import('../../services/treinador.service')
    const spy = jest.spyOn(TreinadorService, 'createTreinador').mockImplementationOnce(() => {
      throw new Error("Erro simulado")
    })
    const res = await request(app)
      .post("/treinadores")
      .send(payload)
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty("error", "Erro ao criar treinador")
    spy.mockRestore()
  })

  test("GET /treinadores - Listagem (apenas Bill pode acessar)", async () => {
    const billPayload = { nome: "Bill", senha: "senhaBill" }
    const billRes = await request(app)
      .post("/treinadores")
      .send(billPayload)
    const billId = billRes.body.id

    await request(app)
      .post("/treinadores")
      .send({ nome: "Treinador1", senha: "123" })
    await request(app)
      .post("/treinadores")
      .send({ nome: "Treinador2", senha: "456" })

    const res = await request(app)
      .get("/treinadores")
      .set("Authorization", `Bearer ${generateToken(billId, "Bill")}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test("GET /treinadores - Listagem (erro interno)", async () => {
    const { TreinadorService } = await import('../../services/treinador.service')
    const spy = jest.spyOn(TreinadorService, 'getAllTreinadores').mockImplementationOnce(() => {
      throw new Error("Erro simulado")
    })
    const createRes = await request(app)
      .post("/treinadores")
      .send({ nome: "Test", senha: "123" })
    const token = generateToken(createRes.body.id, "Test")
    const res = await request(app)
      .get("/treinadores")
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty("error", "Erro ao buscar treinadores")
    spy.mockRestore()
  })

  test("GET /treinadores/:id - Busca de Treinador (sucesso)", async () => {
    const createRes = await request(app)
      .post("/treinadores")
      .send({ nome: "Misty", senha: "water123" })
    const trainerId = createRes.body.id
    const res = await request(app)
      .get(`/treinadores/${trainerId}`)
      .set("Authorization", `Bearer ${generateToken(trainerId, "Misty")}`)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe("Misty")
  })

  test("GET /treinadores/:id - Busca de Treinador (falha: não encontrado)", async () => {
    const res = await request(app)
      .get("/treinadores/inexistente")
      .set("Authorization", `Bearer ${generateToken("inexistente", "NotBill")}`)
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty("error", "Treinador não encontrado")
  })

  test("GET /treinadores/:id - Busca de Treinador (erro interno)", async () => {
    const { TreinadorService } = await import('../../services/treinador.service')
    const spy = jest.spyOn(TreinadorService, 'getTreinadorById').mockImplementationOnce(() => {
      throw new Error("Erro simulado")
    })
    const res = await request(app)
      .get("/treinadores/1")
      .set("Authorization", `Bearer ${generateToken("1", "Test")}`)
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty("error", "Erro ao buscar treinador")
    spy.mockRestore()
  })

  test("PUT /treinadores/:id - Atualização (sucesso)", async () => {
    const createRes = await request(app)
      .post("/treinadores")
      .send({ nome: "Brock", senha: "rocksolid" })
    const trainerId = createRes.body.id
    const updated = { nome: "Brock Updated", senha: "rocksolid" }
    const res = await request(app)
      .put(`/treinadores/${trainerId}`)
      .set("Authorization", `Bearer ${generateToken(trainerId, "Brock")}`)
      .send(updated)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe("Brock Updated")
  })

  test("PUT /treinadores/:id - Atualização (falha: não encontrado)", async () => {
    const res = await request(app)
      .put("/treinadores/inexistente")
      .set("Authorization", `Bearer ${generateToken("inexistente", "NotBill")}`)
      .send({ nome: "Qualquer", senha: "123" })
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty("error", "Treinador não encontrado")
  })

  test("PUT /treinadores/:id - Atualização (erro interno)", async () => {
    const createRes = await request(app)
      .post("/treinadores")
      .send({ nome: "Brock", senha: "rocksolid" })
    const trainerId = createRes.body.id
    const updated = { nome: "Brock Updated", senha: "rocksolid" }
    const { TreinadorService } = await import('../../services/treinador.service')
    const spy = jest.spyOn(TreinadorService, 'updateTreinador').mockImplementationOnce(() => {
      throw new Error("Erro simulado")
    })
    const res = await request(app)
      .put(`/treinadores/${trainerId}`)
      .set("Authorization", `Bearer ${generateToken(trainerId, "Brock")}`)
      .send(updated)
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty("error", "Erro ao atualizar treinador")
    spy.mockRestore()
  })

  test("DELETE /treinadores/:id - Exclusão (sucesso)", async () => {
    const createRes = await request(app)
      .post("/treinadores")
      .send({ nome: "Gary", senha: "rival123" })
    const trainerId = createRes.body.id
    const res = await request(app)
      .delete(`/treinadores/${trainerId}`)
      .set("Authorization", `Bearer ${generateToken(trainerId, "Gary")}`)
    expect(res.status).toBe(204)
  })

  test("DELETE /treinadores/:id - Exclusão (falha: não encontrado)", async () => {
    const res = await request(app)
      .delete("/treinadores/inexistente")
      .set("Authorization", `Bearer ${generateToken("inexistente", "NotBill")}`)
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty("error", "Treinador não encontrado")
  })

  test("DELETE /treinadores/:id - Exclusão (erro interno)", async () => {
    const createRes = await request(app)
      .post("/treinadores")
      .send({ nome: "Gary", senha: "rival123" })
    const trainerId = createRes.body.id
    const { TreinadorService } = await import('../../services/treinador.service')
    const spy = jest.spyOn(TreinadorService, 'deleteTreinador').mockImplementationOnce(() => {
      throw new Error("Erro simulado")
    })
    const res = await request(app)
      .delete(`/treinadores/${trainerId}`)
      .set("Authorization", `Bearer ${generateToken(trainerId, "Gary")}`)
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty("error", "Erro ao deletar treinador")
    spy.mockRestore()
  })
})
