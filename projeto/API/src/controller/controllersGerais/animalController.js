import express, { Router } from 'express';

import { listarAnimais } from '../../repository/animalRepositorys/animalRepository.js';

const endpoints = Router();

endpoints.get('/animal/listar', async (req,resp) => {

    try{

        const respostaRepository=await listarAnimais();

        resp.send(respostaRepository);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;