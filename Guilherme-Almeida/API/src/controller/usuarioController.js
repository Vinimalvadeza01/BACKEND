import {login } from '../repository/usuarioRepository.js'

import { Router } from "express";
const server = Router();

server.post('/usuario/login', async (req, resp) =>{

    try{
        const {emailCPF,senha} = req.body;

        const resposta = await login(emailCPF,senha);

        if(!emailCPF){

            throw new Error('É necessário definir um email ou um CPF para validação!');
        }

        if(!senha){

            throw new Error('É necessário escrever a senha da sua conta!');
        }

        if(resposta.length==0){

            throw new Error('Usuário não encontrado!');
        }

        if(senha!==resposta[0].Senha){

            throw new Error('Senha incorreta!');
        }

        resp.send('Logado Com Sucesso');

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }   
})

export default server;