import express, {Router } from 'express';
import{ CEndereco } from '../../repository/clientRepositorys/CadastroEnderecoRepository.js';

const server= Router();


server.post ('/Endereco', async (req, resp ) => {

    try {
        const resposta = req.body;

        // Verificação de campos nulos
        if(!resposta.cep){

            throw new Error('O cep é obrigatório!');
        
        }
        
        if(!resposta.rua){

            throw new Error('A rua e obrigatorio!');
        
        }
        
        if(!resposta.bairro){

            throw new Error('O bairro é obrigatório!');
        
        }
        
        if(!resposta.numero){

            throw new Error('O numero é obrigatório!');
        
        }


        if(!resposta.estado){

            throw new Error('O estado é obrigado')
        }

        if(!resposta.cidade){

            throw new Error('A cidade é obrigatoria')
        }

        const rspd= await CEndereco(resposta);
        resp.send(rspd)
    }


        catch (err) 
        {
            resp.status(404).send({
                erro:err.message
            });
        }
    
    
    })

    export default server;