import 'dotenv/config';
import produtoController from './controller/produtoController.js';

import cors from 'cors';
import express from 'express';

const server = express();

server.use(cors());
server.use(express.json());

server.use(produtoController)

server.listen(process.env.PORT,
    () => console.log(`API na porra da PORT ${process.env.PORT}`))