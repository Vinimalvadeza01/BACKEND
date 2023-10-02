import 'dotenv/config';
import {con} from './controller/controller.js';
import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

server.listen(
    process.env.PORT,
    () => console.log(`API na porta ${process.env.PORT}`));