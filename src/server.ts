import express from 'express';
import router from './router';
import { connectDB } from './config/db';
import 'dotenv/config';
import cors from 'cors';
import { corsConfig } from './config/cors';

const app = express();

//cors
app.use(cors(corsConfig))

//conectar a la base de datos
connectDB();

//leer datos
app.use(express.json());


app.use('/', router);

export default app;