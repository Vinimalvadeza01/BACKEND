import connection from './connection.js';

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