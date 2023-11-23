import express, { Router } from 'express';
import fs from 'fs';

import { inserirProduto, verificarNomeProduto,ultimoProduto} from '../../repository/produtoRepositorys/adm/pageCadastroRepository.js';
import { consultarProdutos } from '../../repository/produtoRepositorys/adm/pageConsultaRepository.js';
import { consultarProduto, alterarProduto,deletarProduto } from '../../repository/produtoRepositorys/adm/pageAlterarRepository.js';
import { deletarImagensProduto } from '../../repository/imagemRepositorys/adm/deletarRepository.js';
import { verificarCategorias } from '../../repository/categoriaRepositorys/categoriaRepository.js';
import { verificarAnimais } from '../../repository/animalRepositorys/animalRepository.js';
import { verificarAdm } from '../../repository/loginAdmRepositorys/admRepository.js';
import {consultarCapaProduto, consultarImagensSecundariasProduto} from '../../repository/imagemRepositorys/listarRepository.js';

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

endpoints.get('/produto/ultimoProduto', async (req,resp) => {

    try{

        const [resposta]=await ultimoProduto();

        resp.send(resposta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.post('/produto/adm/consulta', async (req,resp) => {

    try{

        const produto = req.body;

        if(produto.cadastroEspecifico && !produto.dataEspecifica){

            throw new Error('A data específicada é inválida');
        }

        // Verificação para filtros que não podem estar ativos juntos

        if(produto.menorEstoque && produto.semEstoque){

            throw new Error('O filtro de "Quantidade em estoque" e o filtro "Sem estoque" não podem ser usados ao mesmo tempo');
        }

        // Para os filtros de data
        const erroData1='O filtro que lista os produtos mais recentes não pode ser usado junto de qualquer outro filtro de data!';

        if(produto.maisRecentes && produto.cadastroEspecifico){

            throw new Error(erroData1);

        }

        const erroData2='O filtro de lançamento específico não pode ser usado junto de qualquer outro filtro de data!';
        if(produto.cadastroEspecifico && produto.naoLancados){

            throw new Error(erroData2);
        }

        else if(produto.cadastroEspecifico && produto.semLancamento){

            throw new Error(erroData2);
        }

        else if(produto.cadastroEspecifico && produto.maisRecentes){

            throw new Error(erroData2);
        }

        if(produto.porCategoria && !produto.categoria){

            throw new Error('Se o filtro de categoria está ativo, o ID da categoria deve ser definido!');
        }

        if(produto.porAnimal && !produto.animal){

            throw new Error('Se o filtro de animal está ativo, o ID do animal deve ser definido!');
        }

        if(produto.porAdministrador && !produto.adm){

            throw new Error('Se o filtro de administrador está ativo, o ID do administrador deve ser definido!');
        }

        const respostaAPI=await consultarProdutos(produto);

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

endpoints.delete('/produto/adm/excluir/:id', async (req,resp) => {

    try{

        const id=req.params.id;

        const [capa]=await consultarCapaProduto(id);
        const imagesSecs=await consultarImagensSecundariasProduto(id);

        // Excluindo o arquivo da capa antiga
        fs.unlink(`${capa.Imagem}`, (err) => {
            if (err){
                        
            };
        });

        // For para deletar os arquivos das imagens secundárias
        for(let item of imagesSecs){

            fs.unlink(`${item.Imagem}`, (err) => {
                if (err){
                            
                };
            });
        }

        // Deleta todas as imagens que possuam aquele id de produto em específico
        const respDeleteImagens=await deletarImagensProduto(id);

        const respDeletarInfsProduto=await deletarProduto(id);

        resp.send('');
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;