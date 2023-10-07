import express, { Router } from 'express';
import multer from 'multer';
import fs from 'fs';

import { inserirImagem,verificarPosicao } from '../repository/imagemRepository.js';
import { verificarProduto } from '../repository/produtoRepository.js';

const endpoints = Router();
const salvarImagem=multer({dest:'storage/images/imagensProdutos'});

endpoints.post('/imagem/:id/:posicao/inserir', salvarImagem.single('imagemProduto'), async (req,resp) => {

    try{

        // Id do produto para o qual a imagem se destina
        const {id,posicao}=req.params;

        const verifId=await verificarProduto(id);
        const verifPos=await verificarPosicao(id,posicao);

        if(verifId.length==0){

            throw new Error('Não foi possível inserir a imagem pois o produto para qual ela se destina não existe');
        }

        if(verifPos.length!==0){

            throw new Error('Já existe uma imagem nesta posição para este produto, escolha outra')
        }

        if(!req.file){

            throw new Error('Não foi possível adicionar a imagem');
        }

        const caminho=req.file.path;

        const respostaRepository=await inserirImagem(caminho,id,posicao);

        resp.send(respostaRepository);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;