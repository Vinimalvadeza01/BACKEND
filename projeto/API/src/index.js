import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import produtoController from './controller/userControllers/produtoController.js';
import imagemController from './controller/userControllers/imageController.js';
import clienteController from './controller/userControllers/clienteController.js'
import CEnderecoController from './controller/userControllers/enderecoController.js'

import animalController from './controller/controllersGerais/animalController.js';
import categoriaController from './controller/controllersGerais/categoriaController.js';

import imagemControllerAdm from './controller/admControllers/imagemControllerAdm.js';
import produtoControllerAdm from './controller/admControllers/produtoControllerAdm.js';
import clienteControllerAdm from './controller/admControllers/clienteControllerAdm.js';
import loginAdmController from './controller/admControllers/loginAdmController.js';

const server=express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, () => console.log(`API subiu na porta ${process.env.PORT}`));

server.use('/storage/images/imagensProdutos', express.static('storage/images/imagensProdutos'));

server.use(produtoControllerAdm);
server.use(imagemControllerAdm);
server.use(clienteControllerAdm);
server.use(loginAdmController);
 
server.use(categoriaController);
server.use(animalController);

server.use(produtoController);
server.use(imagemController);

server.use(clienteController);
server.use(CEnderecoController);