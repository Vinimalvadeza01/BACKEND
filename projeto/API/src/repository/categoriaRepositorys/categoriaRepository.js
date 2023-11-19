import connection from "../connection.js";

export async function verificarCategorias(id){

    let command=`
    
        select id_categoria     as ID,
                ds_categoria    as Categoria
        from TB_CATEGORIA
        Where id_categoria=?
    `;

    const [resp] = await connection.query(command,[id]);

    return resp;
}

export async function listarCategorias(){

    let command=`
    
        Select  id_categoria    as ID,
                ds_categoria    as Categoria
            from TB_CATEGORIA
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}
