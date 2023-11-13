import express, { Router } from 'express';

import { listarCategorias } from '../../repository/categoriaRepositorys/categoriaRepository.js';

const endpoints = Router();

endpoints.get('/categoria/listar', async (req,resp) => {

    try{

        const respostaRepository=await listarCategorias();

        resp.send(respostaRepository);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;