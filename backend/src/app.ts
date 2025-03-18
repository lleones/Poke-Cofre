// src/app.ts
import express from 'express';
import treinadorRoutes from './routes/treinador.routes';
import pokemonRoutes from './routes/pokemon.routes';
import partyRoutes from './routes/party.routes';
import batalhaRoutes from './routes/batalha.routes';
import authRoutes from './routes/auth.routes';
import setupSwagger from './config/swagger';

const app = express();

app.use(express.json());

app.use('/treinadores', treinadorRoutes);
app.use('/pokemons', pokemonRoutes);
app.use('/parties', partyRoutes);
app.use('/batalhas', batalhaRoutes);
app.use('/auth', authRoutes);

setupSwagger(app);

export default app;
