import express, { Router } from 'express';

import { consultarClientes } from '../repository/clienteRepository.js';

const endpoints = Router();

endpoints.post('/cliente/adm/consulta', async (req,resp) => {

    try{

        const filtro=req.body;

        if(filtro.anoNascimento && !filtro.dataInicio || filtro.anoNascimento && !filtro.dataFinal){

            throw new Error('Ano inválido');
        }

        if(filtro.estadoEspecifico && !filtro.estado){

            throw new Error('Se o filtro de estado específico está ativo, você deve definiir o estado!');
        }

        if(filtro.cidadeEspecifica && !cidade){

            throw new Error('Se o filtro de cidade específica está ativo, você deve definiir a cidade!');
        }

        if(filtro.nascimentoMaisNovos && filtro.nascimentoMaisVelhos){

            throw new Error('O filtro que ordena pelos clientes mais novos e pelo que ordena por clientes mais velhos não podem ser usados ao mesmo tempo!');
        }

        const respAPI=await consultarClientes(filtro);

        resp.send(respAPI);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;