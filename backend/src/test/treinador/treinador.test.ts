import request from 'supertest'
import { afterAll, beforeEach, describe, expect, test } from '@jest/globals'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import sequelize from '../../config/db'
import app from '../../app'

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

describe('Treinador API', () => {
  test('GET /treinadores - retorna vazio para Bill', async () => {
    const billToken = jwt.sign({ id: 'bill-id', nome: 'Bill' }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .get('/treinadores')
      .set('Authorization', `Bearer ${billToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(0)
  })

  test('POST /treinadores - cria um novo treinador', async () => {
    const payload = { nome: 'Ash', senha: 'pikachu123' }
    const res = await request(app).post('/treinadores').send(payload)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payload.nome)
    expect(res.body).toHaveProperty('id')
  })

  test('GET /treinadores/:id - retorna o treinador criado', async () => {
    const payload = { nome: 'Misty', senha: 'water123' }
    const createRes = await request(app).post('/treinadores').send(payload)
    const id = createRes.body.id
    const token = jwt.sign({ id, nome: payload.nome }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .get(`/treinadores/${id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe(payload.nome)
  })

  test('PUT /treinadores/:id - atualiza o treinador', async () => {
    const payload = { nome: 'Brock', senha: 'rocksolid' }
    const createRes = await request(app).post('/treinadores').send(payload)
    const id = createRes.body.id
    const token = jwt.sign({ id, nome: payload.nome }, JWT_SECRET, { expiresIn: '1h' })
    const updated = { nome: 'Brock Updated', senha: 'rocksolid' }
    const res = await request(app)
      .put(`/treinadores/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updated)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe(updated.nome)
  })

  test('DELETE /treinadores/:id - deleta o treinador', async () => {
    const payload = { nome: 'Gary', senha: 'rival123' }
    const createRes = await request(app).post('/treinadores').send(payload)
    const id = createRes.body.id
    const token = jwt.sign({ id, nome: payload.nome }, JWT_SECRET, { expiresIn: '1h' })
    const res = await request(app)
      .delete(`/treinadores/${id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
  })
})
