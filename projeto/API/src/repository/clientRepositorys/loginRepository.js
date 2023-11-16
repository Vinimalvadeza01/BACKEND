import connection from "../connection.js";

export async function login(emailCPF) {
    const comando = `Select         
        DS_EMAIL    as Email,
        DS_CPF        as CPF,
        DS_SENHA     as Senha
        from tb_cliente
        Where DS_EMAIL=?  OR DS_CPF=?`
            
    const [linhas] = await con.query(comando,  [emailCPF, emailCPF]);

    return linhas;  
}