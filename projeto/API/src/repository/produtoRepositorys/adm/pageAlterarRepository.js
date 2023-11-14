import connection from "../../connection.js";

export async function alterarProduto(produto,id){

    const command=`
        update tb_produto
            set nm_produto=?,
                id_categoria=?,
                id_animal=?,
                ds_marca=?,
                ds_produto=?,
                ds_peso=?,
                dt_lancamento=?,
                bt_disponivel=?,
                vl_preco=?,
                nr_desconto=?,
                nr_qntdEstoque=?

            where id_produto=?`;

    const [resp]=await connection.query(command,[produto.nome,produto.categoria,produto.animal,produto.marca,produto.descricao,produto.peso,produto.lancamento,produto.disponivel,produto.preco,produto.desconto,produto.estoque,id]);

    return resp;
}