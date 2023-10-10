import express, { Router } from 'express';

import {inserirProduto,verificarNomeProduto,consultarProdutos} from '../repository/produtoRepository.js';

import {verificarCategorias} from '../repository/categoriaRepository.js';
import {verificarAnimais} from '../repository/animaisRepository.js';
import {verificarAdm} from '../repository/admRepository.js';

const endpoints = Router();

endpoints.post('/produto/inserir', async (req,resp) => {

    try{

        const produto=req.body;
        
        // Verificação de campos nulos
        if(!produto.nome){

            throw new Error('O nome do produto é obrigatório!');
        }
        
        if(!produto.categoria){

            throw new Error('É necessário escolher uma categoria para o produto');
        }

        if(!produto.animal){

            throw new Error('É necessário escolher o animal para qual o produto se destina');
        }

        if(!produto.marca){

            throw new Error('A marca do produto é obrigatória!');
        }

        if(!produto.peso){

            throw new Error('O peso do produto é obrigatório');
        }

        if(!produto.preco||isNaN(produto.preco)){

            throw new Error('O preço do produto deve ser definido!');
        }

        if(produto.preco===0){

            throw new Error('O produto não pode ter um preço de 0');
        }

        if(produto.desconto===undefined){

            throw new Error('O valor do desconto não pode ser nulo, digite algo entre 0 e 100');
        }

        if(produto.disponivel===undefined){

            throw new Error('Defina se o produto estará disponível ou não!');
        }

        // Caso o produto esteja disponível ao ser adicionado, irá ser colocado data de hoje
        if(produto.disponivel){

            const hoje= new Date();

            produto.lancamento=hoje;
        }

        // Se não estiver disponível, terá que ser definido a data
        if(!produto.lancamento){

            throw new Error('Se o produto não estiver disponível ao ser cadastrado, é necessário informar uma data de lançamento');
        }

        if(!produto.estoque){

            throw new Error('O estoque deve ser definido');
        }

        if(!produto.adm){

            throw new Error('Não foi possível encontrar seu usuário de administrador em nossos registros');
        }

        // Verificando se o adm, a categoria e o animal são válidos

        const verifCategoria=await verificarCategorias(produto.categoria);
        
        if(verifCategoria.length==0){

            throw new Error('Essa categoria não existe');
        }

        const verifAnimal=await verificarAnimais(produto.animal);
        
        if(verifAnimal.length==0){

            throw new Error('Esse animal não existe');
        }

        const verifAdm=await verificarAdm(produto.adm);
        
        if(verifAdm.length==0){

            throw new Error('Não foi possível encontrar seu usuário de administrador em nossos registros');
        }

        // Verifica se existe um produto com mesmo nome
        
        const verifNome=await verificarNomeProduto(produto.nome);

        if(verifNome.length>0){

            throw new Error('Já existe um produto com este nome, delete-o antes de adicionar este');
        }

        const respostaRepository= await inserirProduto(produto);

        resp.send(respostaRepository);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.get('/produto/consulta/adm', async (req,resp) => {

    try{

        const filtro=req.body;

        const dataEspecifica=req.query;

        const respostaAPI=await consultarProdutos(filtro,dataEspecifica);

        resp.send(respostaAPI);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;

