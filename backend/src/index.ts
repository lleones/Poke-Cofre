import express from 'express';
import treinadorRoutes from './routes/treinador.routes';
import pokemonRoutes from './routes/pokemon.routes';
import partyRoutes from './routes/party.routes';
import batalhaRoutes from './routes/batalha.routes';
import authRoutes from './routes/auth.routes';
import setupSwagger from './config/swagger';
import sequelize from './config/db';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/treinadores', treinadorRoutes);
app.use('/pokemons', pokemonRoutes);
app.use('/parties', partyRoutes);
app.use('/batalhas', batalhaRoutes);
app.use('/auth', authRoutes);

setupSwagger(app);

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
