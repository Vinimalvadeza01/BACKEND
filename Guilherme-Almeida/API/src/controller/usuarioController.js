import {login } from '../repository/usuarioRepository.js'

import { Router } from "express";
const server = Router();

server.post('/usuario/login', async (req, resp) =>{

    try{
        const {emailCPF,senha} = req.body;

        const resposta = await login(emailCPF,senha);

        if(resposta.length==0){

            throw new Error('Usuário não encontrado');
        }

        if(senha!==resposta[0].Senha){

            throw new Error('Senha incorreta');
        }

        resp.send('Logado Com Sucesso');

    } catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }   
})

export default server;