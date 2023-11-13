import express, { Router } from 'express';

import {inserirProduto,verificarNomeProduto,ultimoProduto,
        consultarProdutos,
        
        
        consultarProduto,alterarProduto} from '../repository/produtoRepository.js';

import {verificarCategorias} from '../repository/categoriaRepository.js';
import {verificarAnimais} from '../repository/animaisRepository.js';
import {verificarAdm} from '../repository/admRepository.js';

import {consultaCaesHeader,consultaGatosHeader,consultaPassarosHeader,consultaPeixesHeader,consultaOutrosAnimaisHeader} from '../../repository/produtoRepositorys/headerRepository.js'

const endpoints = Router();



endpoints.post('/produto/adm/consulta', async (req,resp) => {

    try{

        const filtro=req.body;

        if(filtro.cadastroEspecifico && !filtro.dataEspecifica){

            throw new Error('A data específicada é inválida');
        }

        // Verificação para filtros que não podem estar ativos juntos

        if(filtro.menorEstoque && filtro.semEstoque){

            throw new Error('O filtro de "Quantidade em estoque" e o filtro "Sem estoque" não podem ser usados ao mesmo tempo');
        }

        // Para os filtros de data
        const erroData1='O filtro que lista os produtos mais recentes não pode ser usado junto de qualquer outro filtro de data!';

        if(filtro.maisRecentes && filtro.cadastroEspecifico){

            throw new Error(erroData1);

        }

        const erroData2='O filtro de lançamento específico não pode ser usado junto de qualquer outro filtro de data!';
        if(filtro.cadastroEspecifico && filtro.naoLancados){

            throw new Error(erroData2);
        }

        else if(filtro.cadastroEspecifico && filtro.semLancamento){

            throw new Error(erroData2);
        }

        else if(filtro.cadastroEspecifico && filtro.maisRecentes){

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



endpoints.get('/produto/adm/consulta/:id', async (req,resp) => {

    try{

        const id=req.params.id;

        const [resposta]=await consultarProduto(id);

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.put('/produto/alterar/:id', async (req,resp) => {

    try{

        const produto=req.body;
        const idProduto=req.params.id;

        if(!produto.nome){

            throw new Error('Você não pode colocar um nome nulo para o produto');
        }

        if(!produto.marca){

            throw new Error('Você não pode deixar o campo marca como sendo nulo');
        }

        if(!produto.descricao){

            throw new Error('Você não pode colocar uma descrição vazia para o produto');
        }

        if(!produto.peso){

            throw new Error('Você deve especificar o peso do produto');
        }

        if(!produto.categoria){

            throw new Error('Você não pode deixar o produto sem uma categoria');
        }

        if(!produto.animal){

            throw new Error('Você não pode deixar o produto sem um animal especificado');
        }

        if(!produto.lancamento){

            throw new Error('Você deve definir uma data de lançamento para o produto');
        }

        if(produto.disponivel==undefined){

            throw new Error('Defina se o produto estará disponível, ou não disponível');
        }

        if(!produto.preco){

            throw new Error('Preço inválido, defina um preço para o produto');
        }

        if(!produto.desconto && produto.desconto!==0){

            throw new Error('O campo de desconto não pode estar vazio, defina 0% caso não queira nenhum desconto');
        }

        if(!produto.estoque){

            throw new Error('Defina o estoque do produto');
        }

        const resposta=await alterarProduto(produto,idProduto);

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;

