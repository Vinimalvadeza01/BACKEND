import connection from "../../connection.js";

export async function deletarImagensProduto(id){

    const command=`
        DELETE from tb_imagem
        WHERE id_produto=?
    `;

    const [resp]=await connection.query(command,[id]);

    return resp;
}