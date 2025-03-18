import request from 'supertest'
import jwt from 'jsonwebtoken'
import { afterAll, beforeEach, describe, expect, test } from '@jest/globals'
import sequelize from '../../config/db'
import app from '../../app'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'chave_de_fallback'

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

describe("Treinador API", () => {
  test("POST /treinadores - Criação de Treinador (sucesso)", async () => {
    const payload = { nome: "Ash", senha: "pikachu123" }
    const res = await request(app).post('/treinadores').send(payload)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payload.nome)
    expect(res.body).toHaveProperty("id")
  })

  test("POST /treinadores - Criação de Treinador (falha por dados ausentes)", async () => {
    const res = await request(app).post('/treinadores').send({})
    expect(res.status).not.toBe(201)
  })

  test("GET /treinadores - Listagem (apenas Bill pode acessar)", async () => {
    const billToken = jwt.sign({ id: 'bill-id', nome: 'Bill' }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .get('/treinadores')
      .set('Authorization', `Bearer ${billToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test("GET /treinadores/:id - Busca de Treinador (sucesso)", async () => {
    const createRes = await request(app).post('/treinadores').send({ nome: "Misty", senha: "water123" })
    const trainerId = createRes.body.id
    const token = jwt.sign({ id: trainerId, nome: "Misty" }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .get(`/treinadores/${trainerId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe("Misty")
  })

  test("GET /treinadores/:id - Busca de Treinador (falha: não encontrado)", async () => {
    const token = jwt.sign({ id: 'inexistente', nome: "NotBill" }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .get('/treinadores/inexistente')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty("error", "Treinador não encontrado")
  })

  test("PUT /treinadores/:id - Atualização (sucesso)", async () => {
    const createRes = await request(app).post('/treinadores').send({ nome: "Brock", senha: "rocksolid" })
    const trainerId = createRes.body.id
    const token = jwt.sign({ id: trainerId, nome: "Brock" }, JWT_SECRET, { expiresIn: '1h' })
    const updated = { nome: "Brock Updated", senha: "rocksolid" }
    const res = await request(app)
      .put(`/treinadores/${trainerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updated)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe("Brock Updated")
  })

  test("PUT /treinadores/:id - Atualização (falha: não encontrado)", async () => {
    const token = jwt.sign({ id: 'inexistente', nome: "NotBill" }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .put('/treinadores/inexistente')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: "Qualquer" })
    expect(res.status).toBe(404)
  })

  test("DELETE /treinadores/:id - Exclusão (sucesso)", async () => {
    const createRes = await request(app).post('/treinadores').send({ nome: "Gary", senha: "rival123" })
    const trainerId = createRes.body.id
    const token = jwt.sign({ id: trainerId, nome: "Gary" }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .delete(`/treinadores/${trainerId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
  })

  test("DELETE /treinadores/:id - Exclusão (falha: não encontrado)", async () => {
    const token = jwt.sign({ id: 'inexistente', nome: "NotBill" }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .delete('/treinadores/inexistente')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(404)
  })
})
