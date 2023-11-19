import connection from "../../connection.js";

export async function inserirProduto(produto){

    let command=`
        insert into TB_PRODUTO(nm_produto,id_categoria,id_animal,ds_marca,ds_produto,ds_peso,vl_preco,nr_desconto,bt_disponivel,dt_cadastro,dt_lancamento,nr_qntdEstoque,nr_vendas,vl_avaliacao,qtd_avaliacoes,qtd_favoritos,id_adm)
	    values(?,?,?,?,?,?,?,?,?,?,?,?,0,0.0,0,0,?)`;
    
    const [resp]=await connection.query(command,[produto.nome,produto.categoria,produto.animal,produto.marca,produto.descricao,produto.peso,produto.preco,produto.desconto,produto.disponivel,produto.cadastro,produto.lancamento,produto.estoque,produto.adm]);

    produto.id=resp.insertId;

    return resp;
}

// Verifica se há um produto com mesmo nome
export async function verificarNomeProduto(nome){

    let command=`
    
        select id_produto   as ID,
                nm_produto  as Nome

        from TB_PRODUTO
        where nm_produto=?
    `;

    const [resp]= await connection.query(command,[nome]);

    return resp;
}

// Verificar se o id de um determinado produto existe, para inserção de imagem
export async function verificarProduto(id){

    let command=`
    
        Select id_produto
            from TB_PRODUTO

            WHERE id_produto=?
    `;

    const [resp]=await connection.query(command,[id]);
    
    return resp;
}

// Ver o último produto cadastrado para a página de conclusão do cadastro
export async function ultimoProduto(){

    const command=`SELECT id_produto FROM TB_PRODUTO ORDER BY id_produto DESC LIMIT 1`;

    const [resp]=await connection.query(command,[]);

    return resp;
}