import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import produtoController from './controller/produtoController.js';

const server=express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, () => console.log(`API subiu na porta ${process.env.PORT}`));

server.use(produtoController);


