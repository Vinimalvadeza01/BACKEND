import connection from "../connection.js";

export async function consultarCapaProduto(id){

    let command=`

        Select 
        id_imagem 	as ID, 
        ds_imagem 	as Imagem, 
        id_produto 	as Produto, 
        nr_posicao 	as Posição
        
        from TB_IMAGEM
        
        Where id_produto=?
        AND nr_posicao=1`;

    const [resp]=await connection.query(command,[id]);

    return resp;
}

export async function consultarImagensSecundariasProduto(id){

    let command=`

        Select 
        id_imagem 	as ID, 
        ds_imagem 	as Imagem, 
        id_produto 	as Produto, 
        nr_posicao 	as Posição
        
        from TB_IMAGEM
        
        Where id_produto=?
        AND   nr_posicao>1
        ORDER BY nr_posicao asc;
    `;

    const [resp]=await connection.query(command,[id]);

    return resp;
}

export async function consultarImageSecPosicao(id,posicao){

    let command=`

        Select 
        id_imagem 	as ID, 
        ds_imagem 	as Imagem, 
        id_produto 	as Produto, 
        nr_posicao 	as Posição
        
        from TB_IMAGEM
        
        Where id_produto=?
        AND   nr_posicao=?
    `;

    const [resp]=await connection.query(command,[id,posicao]);

    return resp;
}
