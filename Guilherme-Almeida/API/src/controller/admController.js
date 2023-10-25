import { LoginAdm  } from "../repository/admRepository.js";

import { Router } from "express";
const server = Router();

server.post('/adm/login', async (req, resp) =>{

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
})

export default server;