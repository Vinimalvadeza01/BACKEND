import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import usuarioController from './controller/usuarioController.js';
import admController from './controller/admController.js'

const server = express();
server.use(cors());
server.use(express.json());

server.use(usuarioController);
server.use(admController);

server.listen(process.env.PORT,
    () => console.log(`API subiuu ${process.env.PORT}`))