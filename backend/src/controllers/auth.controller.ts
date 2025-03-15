// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import {
  comparePassword,
  generateToken,
  registrarTreinador,
  findTreinadorByNome,
} from '../services/auth.service';

export class AuthController {
  // Exemplo de registro de novo treinador
  static async register(req: Request, res: Response) {
    try {
      const { nome, senha } = req.body;
      if (!nome || !senha) {
        return res
          .status(400)
          .json({ message: 'Nome e senha são obrigatórios.' });
      }

      // Você poderia verificar se já existe um treinador com esse nome
      const treinadorExistente = await findTreinadorByNome(nome);
      if (treinadorExistente) {
        return res
          .status(400)
          .json({ message: 'Já existe um treinador com esse nome.' });
      }

      const novoTreinador = await registrarTreinador(nome, senha);
      return res.status(201).json({
        message: 'Treinador registrado com sucesso!',
        treinador: {
          id: novoTreinador.id,
          nome: novoTreinador.nome,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao registrar treinador', error });
    }
  }

  // Exemplo de login
  static async login(req: Request, res: Response) {
    try {
      const { nome, senha } = req.body;
      if (!nome || !senha) {
        return res
          .status(400)
          .json({ message: 'Nome e senha são obrigatórios.' });
      }

      // Busca o treinador
      const treinador = await findTreinadorByNome(nome);
      if (!treinador) {
        return res
          .status(400)
          .json({ message: 'Nome ou senha inválidos.' });
      }

      // Verifica a senha
      const isPasswordValid = await comparePassword(senha, treinador.senha);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: 'Nome ou senha inválidos.' });
      }

      // Gera token
      const token = generateToken(treinador.id, treinador.nome);

      return res.status(200).json({
        message: 'Login realizado com sucesso!',
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao fazer login', error });
    }
  }
}
