import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

if (
  !process.env.DB_DIALECT ||
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_NAME
) {
  throw new Error('Variáveis de ambiente de banco de dados não configuradas corretamente.');
}

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as "postgres" | "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
});

export default sequelize;
