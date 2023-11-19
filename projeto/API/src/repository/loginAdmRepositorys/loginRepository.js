import connection from "../connection.js";

export async function loginAdm(usuario) {
    const comando = ` Select 
        id_adm      as ID,
        nm_adm   	as 		Adm,	
        ds_senha   		as  	Senha
        from TB_LOGIN_ADM
        where nm_adm=? 
        and ds_senha=?`
            
    const [linhas] = await connection.query(comando,  [usuario.adm, usuario.senha]);

    return linhas;  
}