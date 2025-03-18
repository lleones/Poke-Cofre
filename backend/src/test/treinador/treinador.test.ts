import request from 'supertest';
import jwt from 'jsonwebtoken';
import { afterAll, beforeEach, describe, expect, test } from '@jest/globals';
import sequelize from '../../config/db';
import app from '../../app'; 
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'chave_de_fallback';

const waitForSequelize = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return waitForSequelize();
  }
};

beforeEach(async () => {
  await waitForSequelize();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Treinador API", () => {
  test("GET /treinadores - deve retornar array vazio para Bill", async () => {
    const billToken = jwt.sign({ id: 'bill-id', nome: 'Bill' }, JWT_SECRET, { expiresIn: '1h' });
    const res = await request(app)
      .get('/treinadores')
      .set('Authorization', `Bearer ${billToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test("POST /treinadores - deve criar um novo treinador", async () => {
    const newTrainer = { nome: "Ash", senha: "pikachu123" };
    const res = await request(app)
      .post('/treinadores')
      .send(newTrainer);
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe(newTrainer.nome);
    expect(res.body).toHaveProperty("id");
  });

  test("GET /treinadores/:id - deve retornar o treinador criado", async () => {
    const newTrainer = { nome: "Misty", senha: "water123" };
    const createRes = await request(app)
      .post('/treinadores')
      .send(newTrainer);
    const trainerId = createRes.body.id;
    const token = jwt.sign({ id: trainerId, nome: newTrainer.nome }, JWT_SECRET, { expiresIn: '1h' });
    const res = await request(app)
      .get(`/treinadores/${trainerId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe(newTrainer.nome);
  });

  test("PUT /treinadores/:id - deve atualizar o treinador", async () => {
    const newTrainer = { nome: "Brock", senha: "rocksolid" };
    const createRes = await request(app)
      .post('/treinadores')
      .send(newTrainer);
    const trainerId = createRes.body.id;
    const token = jwt.sign({ id: trainerId, nome: newTrainer.nome }, JWT_SECRET, { expiresIn: '1h' });

    const updatedData = { nome: "Brock Updated", senha: "rocksolid" };
    const res = await request(app)
      .put(`/treinadores/${trainerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe(updatedData.nome);
  });

  test("DELETE /treinadores/:id - deve deletar o treinador", async () => {
    const newTrainer = { nome: "Gary", senha: "rival123" };
    const createRes = await request(app)
      .post('/treinadores')
      .send(newTrainer);
    const trainerId = createRes.body.id;
    const token = jwt.sign({ id: trainerId, nome: newTrainer.nome }, JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .delete(`/treinadores/${trainerId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
