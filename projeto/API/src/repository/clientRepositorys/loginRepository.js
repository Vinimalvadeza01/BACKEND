import connection from "../connection.js";

export async function login(emailCPF,senha) {
    const comando = `Select         
        ds_email    as Email,
        ds_cpf        as CPF,
        ds_senha     as Senha
        from TB_CLIENTE
        Where ds_email=?  OR ds_cpf=?
        AND ds_senha=?`
            
    const [linhas] = await connection.query(comando,  [emailCPF, emailCPF,senha]);

    return linhas;  
}