import connection from './connection.js';

export async function inserirProduto(produto){

    let command=`
        insert into tb_produto(nm_produto,id_categoria,id_animal,ds_marca,ds_peso,vl_preco,nr_desconto,bt_disponivel,dt_lancamento,nr_qntdEstoque,nr_vendas,vl_avaliacao,id_adm)
	    values(?,?,?,?,?,?,?,?,?,?,0,0.0,?)`;
    
    const [resp]=await connection.query(command,[produto.nome,produto.categoria,produto.animal,produto.marca,produto.peso,produto.preco,produto.desconto,produto.disponivel,produto.lancamento,produto.estoque,produto.adm]);

    produto.id=resp.insertId;

    return resp;
}

// 2 gets para verificar se o id digitado em categoria ou em animal existem na tabela

export async function verificarCategorias(id){

    let command=`
    
        select ID_CATEGORIA     as ID,
                DS_CATEGORIA    as Categoria
        from tb_categoria
        Where id_categoria=?
    `;

    const [resp] = await connection.query(command,[id]);

    return resp;
}

export async function verificarAnimais(id){

    let command=`
    
        select ID_ANIMAL        as ID,
                NM_ANIMAL    as Animal
        from tb_animal
        Where id_animal=?
    `;

    const [resp] = await connection.query(command,[id]);
    
    return resp;
}

export async function verificarAdm(id){

    let command=`
    
        select ID_ADM     as ID,
                NM_ADM          as Adm,
                DS_SENHA        as Senha
        from tb_login_adm
        Where id_adm=?
    `;

    const [resp] = await connection.query(command,[id]);
    
    return resp;
}

// Verifica se há um produto com mesmo nome

export async function verificarProduto(nome){

    let command=`
    
        select ID_PRODUTO   as ID,
                NM_PRODUTO  as Nome

        from tb_produto
        where nm_produto=?
    `;

    const [resp]= await connection.query(command,[nome]);

    return resp;
}