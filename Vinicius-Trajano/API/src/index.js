import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import CadastroController from './controller/CadastroController.js';
import CEnderecoController from './controller/EnderecoControler.js';


const server = express();
server.use(cors());
server.use(express.json());


server.use(CadastroController);
server.use(CEnderecoController);




server.listen(
    process.env.PORT,
    () => console.log(`API na porta ${process.env.PORT}`));