import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import eventoRoutes from '../src/routes/eventoRoutes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', eventoRoutes);

mongoose.connect('mongodb://localhost:27017/evento')
    .then(() => console.log('Banco conectado!'))
    .catch((err) => console.log('Erro no banco:', err));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})

app.use(express.static('public'));