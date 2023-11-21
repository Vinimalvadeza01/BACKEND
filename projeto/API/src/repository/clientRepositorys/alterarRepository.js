import connection from "../connection.js";

export async function alterarCliente(cliente){

    const command=`
        update TB_CLIENTE
            set nm_nome=?,
                ds_email=?,
                ds_cpf=?,
                dt_nasc=?,
                ds_senha=?,
                qtd_pedidos=?,
                id_endereco=?
            where id_cliente=?`;

    const [resp]=await connection.query(command,[cliente.nome,cliente.email,cliente.cpf,cliente.nasc,cliente.senha,cliente.pedidos,cliente.endereco,cliente.ID]);

    return resp.affectedRows;
}

export async function alterarEndereco(endereco){

    
}