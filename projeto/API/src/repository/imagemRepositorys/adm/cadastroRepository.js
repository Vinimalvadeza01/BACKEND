import connection from "../../connection.js";

export async function inserirImagem(caminho,produto,posicao){

    let command=`
        insert into TB_IMAGEM(ds_imagem,id_produto,nr_posicao)
            values(?,?,?)`;

    const [resp]=await connection.query(command,[caminho,produto,posicao]);

    return resp;
}

// Verificar se há uma imagem naquela posição antes de cadastrá-la
export async function verificarPosicao(id,posicao){

    let command=`
    
        select id_imagem,id_produto,nr_posicao
            from TB_IMAGEM

            WHERE   id_produto=?
            AND     nr_posicao=?
    `;

    const [resp]=await connection.query(command,[id,posicao]);

    return resp;
}