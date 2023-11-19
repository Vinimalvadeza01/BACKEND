import connection from "../../connection.js";

export async function deletarImagensProduto(id){

    const command=`
        DELETE from TB_IMAGEM
        WHERE id_produto=?
    `;

    const [resp]=await connection.query(command,[id]);

    return resp;
}

export async function deletarImagesSec(id,posicao){

    const command=`
        DELETE from TB_IMAGEM
        WHERE id_produto=?
        AND   nr_posicao=?
    `;

    const [resp]=await connection.query(command,[id,posicao]);

    return resp;
}