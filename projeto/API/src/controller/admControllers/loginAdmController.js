import express, { Router } from 'express';

import {listarAdministradores} from '../../repository/loginAdmRepositorys/admRepository.js';

const endpoints = Router();

endpoints.get('/adm/listar', async (req,resp) => {

    try{

        const respostaAPI=await listarAdministradores();

        resp.send(respostaAPI);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;