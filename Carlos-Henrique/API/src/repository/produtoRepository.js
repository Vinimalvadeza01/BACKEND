import connection from './connection.js';

export async function inserirProduto(produto){

    let command=`
        insert into tb_produto(nm_produto,id_categoria,id_animal,ds_marca,ds_peso,vl_preco,nr_desconto,bt_disponivel,dt_lancamento,nr_qntdEstoque,nr_vendas,vl_avaliacao,qtd_favoritos,id_adm)
	    values(?,?,?,?,?,?,?,?,?,?,0,0.0,0,?)`;
    
    const [resp]=await connection.query(command,[produto.nome,produto.categoria,produto.animal,produto.marca,produto.peso,produto.preco,produto.desconto,produto.disponivel,produto.lancamento,produto.estoque,produto.adm]);

    produto.id=resp.insertId;

    return resp;
}

// Verifica se há um produto com mesmo nome

export async function verificarNomeProduto(nome){

    let command=`
    
        select ID_PRODUTO   as ID,
                NM_PRODUTO  as Nome

        from tb_produto
        where nm_produto=?
    `;

    const [resp]= await connection.query(command,[nome]);

    return resp;
}

// Verificar se o id de um determinado produto existe, para inserção de imagem

export async function verificarProduto(id){

    let command=`
    
        Select ID_PRODUTO
            from tb_produto

            WHERE id_produto=?
    `;

    const [resp]=await connection.query(command,[id]);
    
    return resp;
}

// Comandos de consulta adm
export async function consultarProdutos(filtro){

    let comandoBase=`    
            Select 
                TB_produto.ID_produto       as ID,
                DS_imagem                   as Capa,
                DS_categoria                as Categoria,
                NM_produto                  as Nome,
                NM_animal                   as Animal,
                NR_vendas                   as Vendas,
                NR_qntdEstoque              as Estoque,
                VL_preco                    as Preço,
                NR_desconto                 as Desconto,
                BT_disponivel               as Disponível,
                DT_lancamento               as Lançamento,
                VL_avaliacao                as Avaliação,
                QTD_favoritos               as Favoritos,
                NM_adm                      as Adm

                from TB_produto

                    Inner join TB_imagem
                        ON TB_produto.ID_produto=TB_imagem.ID_produto
                    Inner Join TB_categoria
                        ON TB_produto.ID_categoria=TB_categoria.ID_categoria
                    Inner Join TB_animal
                        ON TB_produto.ID_animal=TB_animal.ID_animal
                    Inner Join TB_login_adm
						ON	TB_produto.ID_adm=TB_login_adm.ID_adm

                        Where NR_posicao=1 `;

    let comandoCondicao=``;
    if(filtro.semEstoque){

        comandoCondicao=comandoCondicao+` and nr_qntdEstoque=0 `
    }                        
    
    if(filtro.naoDisponivel){

        comandoCondicao=comandoCondicao+` and bt_disponivel=false `;
    }

    if(filtro.semLancamento){

        comandoCondicao=comandoCondicao+` and dt_lancamento='2099-01-01 00:00:00' `
    }
    
    if(filtro.lancamentoEspecifico){

        comandoCondicao=comandoCondicao+` and dt_lancamento=? `;
    }

    let comandoOrder=`ORDER BY `;
    let contarPosicoes=0;
    let colunas=[];

    if(filtro.vendas){

        colunas[contarPosicoes]=`NR_vendas desc`;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.avaliacao){

        colunas[contarPosicoes]=`VL_avaliacao desc`;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.qtdFavoritos){

        colunas[contarPosicoes]=`QTD_favoritos desc`;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.qtdEstoque){

        colunas[contarPosicoes]=`NR_qntdEstoque desc`;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.naoLancados){

        colunas[contarPosicoes]=`dt_lancamento asc`;

        contarPosicoes=contarPosicoes+1;
    }

    for(let item of colunas){

        if(item!==colunas[colunas.length-1] && item!=undefined){

            comandoOrder=comandoOrder+item+','
        }

        else{

            comandoOrder=comandoOrder+item
        }
    }

    // Caso nenhum dos valores anteriores seja true, seta o comandoOrder como sendo vazio para não dar erro
    if(comandoOrder=='ORDER BY '){

        comandoOrder='';
    }

    // #Filtro de quantidade em estoque não pode estar ativo junto do filtro de estoque=0`;

    let command=comandoBase+comandoCondicao+comandoOrder;

    const [resp]=await connection.query(command,[filtro.semEstoque,filtro.naoDisponivel,filtro.semLancamento,filtro.lancamentoEspecifico,filtro.dataEspecifica,filtro.vendas,filtro.qtdFavoritos,filtro.qtdEstoque,filtro.naoLancados]);

    return resp;
}