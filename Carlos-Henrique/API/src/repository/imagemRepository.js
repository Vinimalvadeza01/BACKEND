import connection from './connection.js';

export async function inserirImagem(caminho,produto,posicao){

    let command=`
        insert into tb_imagem(ds_imagem,id_produto,nr_posicao)
            values(?,?,?)`;

    const [resp]=await connection.query(command,[caminho,produto,posicao]);

    return resp;
}

// Verificar se há uma imagem naquela posição
export async function verificarPosicao(id,posicao){

    let command=`
    
        select ID_IMAGEM,ID_PRODUTO,NR_POSICAO
            from tb_imagem

            WHERE   id_produto=?
            AND     nr_posicao=?
    `;

    const [resp]=await connection.query(command,[id,posicao]);

    return resp;
}

export async function consultarImagensProduto(id){

    let command=`

        Select 
        id_imagem 	as ID, 
        ds_imagem 	as Imagem, 
        id_produto 	as Produto, 
        nr_posicao 	as Posição
        
        from tb_imagem
        
        Where id_produto=1;
    `;

    const [resp]=await connection.query(command,[id]);

    return resp;
}