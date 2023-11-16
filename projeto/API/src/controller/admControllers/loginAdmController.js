import express, { Router } from 'express';

import {listarAdministradores} from '../../repository/loginAdmRepositorys/admRepository.js';
import {loginAdm} from '../../repository/loginAdmRepositorys/loginRepository.js';

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

endpoints.post('/adm/login', async (req, resp) =>{

    try{
        const usuario = req.body;

        if(!usuario.adm){

            throw new Error('É necessário definir nome de usuário!');
        }

        if(!usuario.senha){

            throw new Error('É necessário escrever a senha da sua conta!');
        }

        const [resposta] = await loginAdm (usuario);

        if(resposta.length==0){

            throw new Error('Usuário não encontrado!');
        }

        if(usuario.senha!==resposta.Senha){

            throw new Error('Senha incorreta!');
        }

        resp.send(resposta);

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }   
});

export default endpoints;