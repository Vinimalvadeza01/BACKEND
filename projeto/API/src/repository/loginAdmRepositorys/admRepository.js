import connection from "../connection.js";

export async function verificarAdm(id){

    let command=`
    
        select ID_ADM     as ID,
                NM_ADM          as Adm,
                DS_SENHA        as Senha
        from tb_login_adm
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