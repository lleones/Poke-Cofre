// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Treinador from '../models/treinador.model';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'chave_de_fallback';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(treinadorId: string, nome: string): string {
  return jwt.sign({ id: treinadorId, nome }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export async function registrarTreinador(nome: string, senha: string) {
  const senhaCriptografada = await hashPassword(senha);
  const novoTreinador = await Treinador.create({
    nome,
    senha: senhaCriptografada,
  });
  return novoTreinador;
}

export async function findTreinadorByNome(nome: string) {
  return Treinador.findOne({ where: { nome } });
}
