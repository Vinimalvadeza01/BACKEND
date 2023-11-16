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

endpoints.post('/adm/login', async (req, resp) =>{

    try{
        const usuario = req.body;

        const resposta = await LoginAdm (usuario);

        if(!usuario.adm){

            throw new Error('É necessário definir nome de usuário!');
        }

        if(!usuario.senha){

            throw new Error('É necessário escrever a senha da sua conta!');
        }

        if(resposta.length==0){

            throw new Error('Usuário não encontrado!');
        }

        if(usuario.senha!==resposta[0].Senha){

            throw new Error('Senha incorreta!');
        }

        resp.send('Logado Com Sucesso');

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }   
});

export default endpoints;