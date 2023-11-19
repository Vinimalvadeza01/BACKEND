import connection from "../connection.js";

export async function verificarAdm(id){

    let command=`
    
        select id_adm     as ID,
                nm_adm          as Adm,
                ds_senha        as Senha
        from TB_LOGIN_ADM
        Where id_adm=?
    `;

    const [resp] = await connection.query(command,[id]);
    
    return resp;
}

export async function listarAdministradores(){

    let command=`
    
        Select  id_adm as ID,
                nm_adm as Adm
        from TB_LOGIN_ADM 
    `;

    const [resp]= await connection.query(command,[]);

    return resp;
}