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

describe('Batalha API', () => {
  test('POST /batalhas - cria uma nova batalha', async () => {
    const payload = {
      winnerTrainerId: 'winner-trainer',
      loserTrainerId: 'loser-trainer',
      winnerPokemonId: 'w-poke',
      loserPokemonId: 'l-poke'
    }
    const res = await request(app).post('/batalhas').send(payload)
    expect(res.status).toBe(201)
    expect(res.body.winnerTrainerId).toBe(payload.winnerTrainerId)
  })

  test('GET /batalhas - retorna array vazio inicialmente', async () => {
    const res = await request(app).get('/batalhas')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(0)
  })

  test('GET /batalhas/:id - retorna batalha criada', async () => {
    const payload = {
      winnerTrainerId: 'winner-2',
      loserTrainerId: 'loser-2',
      winnerPokemonId: 'w2-poke',
      loserPokemonId: 'l2-poke'
    }
    const createRes = await request(app).post('/batalhas').send(payload)
    const id = createRes.body.id
    const res = await request(app).get(`/batalhas/${id}`)
    expect(res.status).toBe(200)
    expect(res.body.winnerTrainerId).toBe(payload.winnerTrainerId)
  })

  test('DELETE /batalhas/:id - deleta batalha', async () => {
    const payload = {
      winnerTrainerId: 'winner-3',
      loserTrainerId: 'loser-3',
      winnerPokemonId: 'w3-poke',
      loserPokemonId: 'l3-poke'
    }
    const createRes = await request(app).post('/batalhas').send(payload)
    const id = createRes.body.id
    const res = await request(app).delete(`/batalhas/${id}`)
    expect(res.status).toBe(204)
  })

  test('POST /batalhas - falha por payload incompleto', async () => {
    const payload = {}
    const res = await request(app).post('/batalhas').send(payload)
    expect(res.status).not.toBe(201)
  })
})
