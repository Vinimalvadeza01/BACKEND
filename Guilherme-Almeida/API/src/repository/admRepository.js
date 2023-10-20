import {con} from './connection.js'

export async function  LoginAdm (usuario) {
    const comando = ` Select 
    nm_adm   	as 		Adm,	
    ds_senha   		as  	Senha
    from tb_login_adm
    where nm_adm=? 
    and ds_senha=?`
            
    const [linhas] = await con.query(comando,  [usuario.adm, usuario.senha]);

    return linhas;  
}