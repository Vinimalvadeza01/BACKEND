import connection from './connection.js';

export async function inserirProduto(produto){

    let command=`
        insert into tb_produto(nm_produto,id_categoria,id_animal,ds_marca,ds_peso,vl_preco,nr_desconto,bt_disponivel,dt_lancamento,nr_qntdEstoque,nr_vendas,vl_avaliacao,id_adm)
	    values(?,?,?,?,?,?,?,?,?,?,0,0.0,?)`;
    
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