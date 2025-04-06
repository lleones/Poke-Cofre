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

describe('Pokémon API', () => {
  test('POST /pokemons - cria um novo Pokémon', async () => {
    const payload = { trainerId: 'trainer-1', name: 'pikachu' }
    const res = await request(app).post('/pokemons').send(payload)
    expect(res.status).toBe(201)
    expect(res.body.trainerId).toBe(payload.trainerId)
  })

  test('GET /pokemons - retorna array vazio inicialmente', async () => {
    const res = await request(app).get('/pokemons')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(0)
  })

  test('GET /pokemons/:id - retorna o pokémon criado', async () => {
    const payload = { trainerId: 'trainer-2', name: 'bulbasaur' }
    const createRes = await request(app).post('/pokemons').send(payload)
    const id = createRes.body.id
    const res = await request(app).get(`/pokemons/${id}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(payload.name)
  })

  test('PUT /pokemons/:id - atualiza nickname do pokémon', async () => {
    const payload = { trainerId: 'trainer-3', name: 'charmander' }
    const createRes = await request(app).post('/pokemons').send(payload)
    const id = createRes.body.id
    const updated = { nickname: 'Flame' }
    const res = await request(app).put(`/pokemons/${id}`).send(updated)
    expect(res.status).toBe(200)
    expect(res.body.nickname).toBe(updated.nickname)
  })

  test('DELETE /pokemons/:id - deleta o pokémon', async () => {
    const payload = { trainerId: 'trainer-4', name: 'squirtle' }
    const createRes = await request(app).post('/pokemons').send(payload)
    const id = createRes.body.id
    const res = await request(app).delete(`/pokemons/${id}`)
    expect(res.status).toBe(204)
  })
})
