import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import produtoController from './controller/produtoController.js';
import imagemController from './controller/imagemController.js';
import categoriaController from './controller/categoriaController.js';
import animalController from './controller/animalController.js';
import clienteController from './controller/clienteController.js';

import CadastroController from './controller/CadastroController.js';

const server=express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, () => console.log(`API subiu na porta ${process.env.PORT}`));

server.use('/storage/images/imagensProdutos', express.static('storage/images/imagensProdutos'))

server.use(produtoController);
server.use(imagemController);
server.use(categoriaController);
server.use(animalController);
server.use(clienteController);


server.use(CadastroController);


