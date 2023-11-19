import connection from "../connection.js";

export async function verificarAnimais(id){

    let command=`
    
        select id_animal        as ID,
                nm_animal    as Animal
        from TB_ANIMAL
        Where id_animal=?
    `;

    const [resp] = await connection.query(command,[id]);
    
    return resp;
}

export async function listarAnimais(){

    let command=`
    
        Select  id_animal       as ID,
                nm_animal       as Animal
            from TB_ANIMAL
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}