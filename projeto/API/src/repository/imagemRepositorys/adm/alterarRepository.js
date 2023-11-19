import connection from "../../connection.js";

export async function alterarImagePrincipal(imagem,idProduto,idImagem){

    let command=`			
        update TB_IMAGEM
            set ds_imagem=?,
                id_produto=?,
                nr_posicao=1
        where   id_imagem=?`

    const [resp]=await connection.query(command,[imagem,idProduto,idImagem]);

    return resp.affectedRows;
}

export async function alterarImageSecundaria(imagem,idProduto,posicao,idImagem){

    const command=`
        update TB_IMAGEM
        set ds_imagem=?,
            id_produto=?,
            nr_posicao=?
        where   id_imagem=?
        and     nr_posicao>1
    `;

    const [resp]=await connection.query(command,[imagem,idProduto,posicao,idImagem]);

    return resp.affectedRows; 
}