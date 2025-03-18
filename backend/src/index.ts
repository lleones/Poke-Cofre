// src/index.ts
import app from './app';
import sequelize from './config/db';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
