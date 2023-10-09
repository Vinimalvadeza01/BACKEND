import connection from './connection.js';

export async function verificarAnimais(id){

    let command=`
    
        select ID_ANIMAL        as ID,
                NM_ANIMAL    as Animal
        from tb_animal
        Where id_animal=?
    `;

    const [resp] = await connection.query(command,[id]);
    
    return resp;
}

export async function listarAnimais(){

    let command=`
    
        Select  ID_ANIMAL       as ID,
                NM_ANIMAL       as Animal
            from tb_animal
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}