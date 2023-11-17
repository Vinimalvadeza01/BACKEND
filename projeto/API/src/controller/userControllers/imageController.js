import express, { Router } from 'express';

import { consultarCapaProduto, consultarImagensSecundariasProduto } from '../../repository/imagemRepositorys/listarRepository.js';

const endpoints = Router();

endpoints.get('/imagem/consulta/capa/:id', async (req,resp) => {

    try{

        const id=req.params.id;

        const [resposta]=await consultarCapaProduto(id);

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({
            erro:err.message
        });
    }
});

endpoints.get('/imagem/consulta/sec/:id', async (req,resp) => {

    try{

        const id=req.params.id;

        const resposta=await consultarImagensSecundariasProduto(id);

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;