import express, {Router } from 'express';
import{ CEndereco } from '../../repository/clientRepositorys/CadastroEnderecoRepository.js';
import { consultarInfsEnderecoPerfil } from '../../repository/clientRepositorys/perfilRepository.js';
import { alterarEndereco } from '../../repository/clientRepositorys/alterarRepository.js';

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
    
    
});

server.get('/endereco/perfil/consulta/:id', async (req,resp) => {
    
    try{

        const id=req.params.id;

        const [respostaConsulta]=await consultarInfsEnderecoPerfil(id);

        resp.send(respostaConsulta);
    }

    catch(err){

        resp.status(404).send({
            
            erro:err.message
        });
    }
});

server.put('/endereco/alterar', async (req,resp) => {

    try{

        const endereco=req.body;

        //endereco.bairro,endereco.numero,endereco.complemento,endereco.estado,endereco.cidade,endereco.ID
        
        if(!endereco.cliente){

            throw new Error('Não foi possível alterar o endereço, pois o cliente não foi identificado');
        }

        if(!endereco.cep){

            throw new Error('Não foi possível alterar o endereço, pois o valor do cep antigo não foi identificado');
        }

        if(!endereco.rua){

            throw new Error('Não foi possível alterar o endereço, pois o valor da rua antiga não foi identificado');
        }

        if(!endereco.bairro){

            throw new Error('Não foi possível alterar o endereço, pois o valor do bairro antigo não foi identificado');
        }

        if(!endereco.numero){

            throw new Error('Não foi possível alterar o endereço, pois o valor do número antigo não foi identificado');
        }

        if(!endereco.estado){

            throw new Error('Não foi possível alterar o endereço, pois o valor do estado antigo não foi identificado');
        }

        if(!endereco.cidade){

            throw new Error('Não foi possível alterar o endereço, pois o valor da cidade antiga não foi identificado');
        }

        if(!endereco.ID){

            throw new Error('Não foi possível identificar o ID do seu endereço');
        }

        const alterar=await alterarEndereco(endereco);

        if(alterar===0){

            throw new Error('Não foi possível alterar o produto');
        }

        resp.send(endereco);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default server;