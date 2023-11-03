import express, { Router } from 'express';

import {inserirProduto,verificarNomeProduto,consultarProdutos,consultaMaisVendidos,consultaMelhorAval,consultaMVCachorro,consultaMVGato,consultaCaesHeader,consultaGatosHeader,consultaPassarosHeader,consultaPeixesHeader,consultaOutrosAnimaisHeader} from '../repository/produtoRepository.js';

import {verificarCategorias} from '../repository/categoriaRepository.js';
import {verificarAnimais} from '../repository/animaisRepository.js';
import {verificarAdm} from '../repository/admRepository.js';

const endpoints = Router();

endpoints.post('/produto/inserir', async (req,resp) => {

    try{

        const produto=req.body;
        
        const hoje=new Date();
        let formatarData=hoje.toISOString().split('T');

        produto.cadastro=formatarData[0];

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

        if(!produto.descricao){

            throw new Error('Escreva uma descrição do produto!');
        }

        if(!produto.peso){

            throw new Error('O peso do produto é obrigatório');
        }

        if(!produto.preco||isNaN(produto.preco)){

            throw new Error('O preço do produto deve ser definido!');
        }

        if(produto.preco===0){

            throw new Error('O produto não pode ter um preço de 0R$');
        }

        if(produto.desconto===undefined){

            throw new Error('O valor do desconto não pode ser nulo, digite algo entre 0 e 100');
        }

        if(!produto.cadastro){

            throw new Error('Não foi possível definir a data de cadastro do produto');
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

endpoints.post('/produto/adm/consulta', async (req,resp) => {

    try{

        const filtro=req.body;

        if(filtro.lancamentoEspecifico && !filtro.dataEspecifica){

            throw new Error('A data específicada é inválida');
        }

        // Verificação para filtros que não podem estar ativos juntos

        if(filtro.menorEstoque && filtro.semEstoque){

            throw new Error('O filtro de "Quantidade em estoque" e o filtro "Sem estoque" não podem ser usados ao mesmo tempo');
        }

        // Para os filtros de data
        const erroData1='O filtro que lista os produtos mais recentes não pode ser usado junto de qualquer outro filtro de data!';

        if(filtro.maisRecentes && filtro.naoLancados){

            throw new Error(erroData1);
        }

        else if(filtro.maisRecentes && filtro.semLancamento){

            throw new Error(erroData1);
        }

        else if(filtro.maisRecentes && filtro.lancamentoEspecifico){

            throw new Error(erroData1);

        }

        const erroData2='O filtro de lançamento específico não pode ser usado junto de qualquer outro filtro de data!';
        if(filtro.lancamentoEspecifico && filtro.naoLancados){

            throw new Error(erroData2);
        }

        else if(filtro.lancamentoEspecifico && filtro.semLancamento){

            throw new Error(erroData2);
        }

        else if(filtro.lancamentoEspecifico && filtro.maisRecentes){

            throw new Error(erroData2);
        }

        if(filtro.porCategoria && !filtro.categoria){

            throw new Error('Se o filtro de categoria está ativo, o ID da categoria deve ser definido!');
        }

        if(filtro.porAnimal && !filtro.animal){

            throw new Error('Se o filtro de animal está ativo, o ID do animal deve ser definido!');
        }

        if(filtro.porAdministrador && !filtro.adm){

            throw new Error('Se o filtro de administrador está ativo, o ID do administrador deve ser definido!');
        }

        const respostaAPI=await consultarProdutos(filtro);

        resp.send(respostaAPI);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

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

export default endpoints;

