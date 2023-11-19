import connection from '../connection.js';

export async function consultarProdutos(filtros){

    const comandoBase=`
        Select  TB_PRODUTO.id_produto AS ID,    
        ds_imagem  as Capa,
        nm_produto as Nome,
        TB_PRODUTO.id_categoria	as Categoria_ID,
        TB_PRODUTO.id_animal	as Animal_ID,
        vl_avaliacao as Avaliação,
        qtd_avaliacoes as Avaliações,
        vl_preco as Preço,
        nr_vendas as Vendas,
        bt_disponivel as Disponivel

        FROM            TB_PRODUTO

        Inner Join TB_IMAGEM
            ON TB_PRODUTO.id_produto=TB_IMAGEM.id_produto
        Inner Join TB_CATEGORIA
            ON TB_PRODUTO.id_categoria=TB_CATEGORIA.id_categoria
        Inner Join TB_ANIMAL
            ON TB_PRODUTO.id_animal=TB_ANIMAL.id_animal

        WHERE           nr_posicao=1
        AND             bt_disponivel=true 
        AND             nm_produto like(?)`;

    let comandoWhere=``;
    let comandoOrder=` ORDER BY `;
    let contarPosicoesOrder=0;
    let colunasOrder=[];

    if(filtros.categoria){

        const puxarCategoria=[];
        puxarCategoria.push(filtros.idCategoria);

        comandoWhere=comandoWhere+` AND TB_PRODUTO.id_categoria=${filtros.idCategoria}`
    }

    if(filtros.animal){

        const puxarAnimal=[];
        puxarAnimal.push(filtros.idAnimal);

        comandoWhere=comandoWhere+` AND TB_PRODUTO.id_animal=${filtros.idAnimal}`;
    }

    if(filtros.maisVendidos){

        colunasOrder[contarPosicoesOrder]=` nr_vendas desc `;

        contarPosicoesOrder=contarPosicoesOrder+1;
    }

    if(filtros.melhorAvaliados){

        colunasOrder[contarPosicoesOrder]=` vl_avaliacao desc `;

        contarPosicoesOrder=contarPosicoesOrder+1;
    }

    for(let item of colunasOrder){

        if(item!==colunasOrder[colunasOrder.length-1] && item!=undefined){

            comandoOrder=comandoOrder+item+','
        }

        else{

            comandoOrder=comandoOrder+item
        }
    }

    // Caso nenhum dos valores anteriores seja true, seta o comandoOrder como sendo vazio para não dar erro
    if(comandoOrder==' ORDER BY '){

        comandoOrder='';
    }

    let command=comandoBase+comandoWhere+comandoOrder;

    const [resp]=await connection.query(command,[`%${filtros.produto}%`,filtros.categoria,filtros.idCategoria,filtros.animal,filtros.idAnimal,filtros.maisVendidos,filtros.melhorAvaliados])

    return resp;
}
