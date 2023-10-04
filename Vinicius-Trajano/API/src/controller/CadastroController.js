import { Cadastro, VerificarCpf, VerificarEmail } from '../repository/cadastroRepository.js';
import express, {Router } from 'express';


const server= Router();

server.post ('/cliente', async (req, resp ) => {

    try {
        const resposta = req.body;

        // Verificação de campos nulos

        if(!resposta.nome){

            throw new Error('O nome é obrigatório!');
        
        }
        
        if(!resposta.email){

            throw new Error('O email e obrigatorio!');
        
        }
        
        if(!resposta.cpf){

            throw new Error('O cpf é obrigatório!');
        
        }
        
        if(!resposta.datanasc){

            throw new Error('A data de nascimento é obrigatório!');
        
        }
        
        if(!resposta.senha){

            throw new Error('A senha é obrigatório!');
        
        }

         // Verifica se o cliente nao esta repetindo dados de outro cliente
        
         const VerifcCpf =await VerificarCpf(resposta.cpf);

         if(VerifcCpf.length>0){
 
             throw new Error('Já existe um cadastro feito com esse CPF!');
         }

         
         const VerifcEmail =await VerificarEmail(resposta.email);

         
         if(VerifcEmail.length>0){
 
            throw new Error('Esse E-mail já foi cadastrado!');
        }
        


        const respsd = await Cadastro(resposta);
        resp.send(respsd)
    } 
    
    catch (err) 
    {
        resp.status(400).send({
            erro:err.message
        });
    }

})


export default server;