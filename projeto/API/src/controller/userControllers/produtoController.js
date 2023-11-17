import express, { Router } from 'express';

import {consultaCaesHeader,consultaGatosHeader,consultaPassarosHeader,consultaPeixesHeader,consultaOutrosAnimaisHeader} from '../../repository/produtoRepositorys/headerRepository.js';
import {consultaMaisVendidos,consultaMelhorAval,consultaMVCachorro,consultaMVGato} from '../../repository/produtoRepositorys/homePageRepository.js';
import { consultarProdutos } from '../../repository/produtoRepositorys/consultaProdutos.js';

const endpoints = Router();

// Gets para header do usuário
endpoints.get('/produto/consulta/header/caes', async (req,resp) => {

    try{

        const resposta=await consultaCaesHeader();

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.get('/produto/consulta/header/gatos', async (req,resp) => {

    try{

        const resposta=await consultaGatosHeader();

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.get('/produto/consulta/header/passaros', async (req,resp) => {

    try{

        const resposta=await consultaPassarosHeader();

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.get('/produto/consulta/header/peixes', async (req,resp) => {

    try{

        const resposta=await consultaPeixesHeader();

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.get('/produto/consulta/header/outros', async (req,resp) => {

    try{

        const resposta=await consultaOutrosAnimaisHeader();

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

// Gets para mostrar produtos na home page
endpoints.get('/produto/consulta/maisVendidos', async (req, resp) => {
    try {
       
        const resposta = await consultaMaisVendidos();
        resp.send(resposta)
    }   catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/produto/consulta/melhorAval', async (req, resp) => {
    try {
        const resposta = await consultaMelhorAval();
        resp.send(resposta)
    }   catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/produto/consulta/MVCachorro', async (req, resp) =>{
    try {
        const resposta = await consultaMVCachorro();
        resp.send(resposta)
    }   catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/produto/consulta/MVGato', async (req, resp) =>{
    try {
        const resposta = await consultaMVGato();
        resp.send(resposta)
    }   catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.post('/produto/consulta', async (req,resp) => {

    try{

        const filtros=req.body;

        const resposta=await consultarProdutos(filtros);

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;