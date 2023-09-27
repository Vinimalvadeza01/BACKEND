import {con} from './connection.js'

export async function login(email, senha) {
    const comando = `Select         
        DS_EMAIL    as Email,
        DS_CPF        as CPF,
        DS_SENHA     as Senha
        from tb_cliente
        Where DS_EMAIL=?  OR DS_CPF=?
        AND DS_SENHA=?`
        
    const [linhas] = await con.query(comando,  [email, senha])
    return linhas[0];  

}