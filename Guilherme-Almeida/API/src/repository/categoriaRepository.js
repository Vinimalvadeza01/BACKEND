import {con} from './connection.js';

export async function verificarCategorias(id){

    let command=`
    
        select ID_CATEGORIA     as ID,
                DS_CATEGORIA    as Categoria
        from tb_categoria
        Where id_categoria=?
    `;

    const [resp] = await con.query(command,[id]);

    return resp;
}

export async function listarCategorias(){

    let command=`
    
        Select  ID_CATEGORIA    as ID,
                DS_CATEGORIA    as Categoria
            from tb_categoria
    `;

    const [resp]=await con.query(command,[]);

    return resp;
}