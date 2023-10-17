import { Router } from 'express';

import { consultaMaisVendidos } from '../repository/produtoRepository.js';
const server = Router();

server.get('/produto/consulta/maisVendidos', async (req, resp) => {
    try {
       
        const resposta = await consultaMaisVendidos();
        resp.send(resposta)
    }   catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
export default server;