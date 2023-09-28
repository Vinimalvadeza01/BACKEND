import express, { Router } from 'express';
import {inserirProduto} from '../repository/produtoRepository.js';

const endpoints = Router();

endpoints.post('/produto/inserir', async (req,resp) => {

    try{

        const produto=req.body;

        const respostaRepository=inserirProduto(produto);

        resp.send(respostaRepository);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;

