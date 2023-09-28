import connection from './connection.js';

export default async function inserirProduto(produto){

    let command=`
        insert into tb_produto(nm_produto,id_categoria,id_animal,ds_marca,ds_peso,vl_preco,nr_desconto,bt_disponivel,dt_lancamento,nr_qntdEstoque,nr_vendas,vl_avaliacao)
	    values(?,?,?,?,?,?,?,?,?,?,0,0.0)`;

    
    const [resp]=await connection.query([command,[produto.nome,produto.categoria,produto.animal,produto.marca,produto.peso,produto.preco,produto.desconto,produto.disponivel,produto.lancamento,produto.estoque]]);
    return (resp);
}