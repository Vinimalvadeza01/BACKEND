import express, { Router } from 'express';
import multer from 'multer';
import fs from 'fs';

import { inserirImagem,verificarPosicao,consultarCapaProduto,consultarImagensSecundariasProduto, alterarImagePrincipal } from '../repository/imagemRepository.js';
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

endpoints.get('/imagem/consulta/capa/:id', async (req,resp) => {

    try{

        const id=req.params.id;

        const [resposta]=await consultarCapaProduto(id);

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({
            erro:err.message
        });
    }
});

endpoints.get('/imagem/consulta/:id', async (req,resp) => {

    try{

        const id=req.params.id;

        const resposta=await consultarImagensSecundariasProduto(id);

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.put('/imagem/alterar/capa/:id', salvarImagem.single('imagemProduto'), async (req,resp) => {

    try{

        const idProduto=req.params.id;

        const [consultarArquivo]=await consultarCapaProduto(idProduto);

        const idImagem=consultarArquivo.ID;

        // Excluindo o arquivo da capa antiga
        fs.unlink(`${consultarArquivo.Imagem}`, (err) => {
            if (err) throw err;
        });

        // Adicionando nova capa
        if(!req.file){

            throw new Error('Não foi possível adicionar a imagem');
        }

        const caminho=req.file.path;

        const alterarCapa=await alterarImagePrincipal(caminho,idProduto,idImagem);

        if(alterarCapa===0){

            throw new Error('Não possível alterar a capa do produto');
        }

        resp.send('');
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;