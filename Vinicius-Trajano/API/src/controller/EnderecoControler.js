import express, {Router } from 'express';


const server= Router();


server.post ('/Endereco', async (req, resp ) => {

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
        
        if(!resposta.senha){

            throw new Error('A senha é obrigatório!');
        
        }

        if(!resposta.nasc){

            throw new Error('A data de nascimento é obrigatório!');
        
        }

        const respsd = await Cadastro(resposta);
        resp.send(respsd)
    }
        catch (err) 
        {
            resp.status(404).send({
                erro:err.message
            });
        }
    
    
    })