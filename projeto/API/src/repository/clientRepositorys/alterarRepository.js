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

    const command=` 
        update TB_ENDERECO
            set id_cliente=?,
                ds_cep=?,
                nm_rua=?,
                nm_bairro=?,
                ds_numero=?,
                ds_complemento=?,
                nm_estado=?,
                nm_cidade=?
            WHERE id_endereco=?`;

    const [resp]=await connection.query(command,[endereco.cliente,endereco.cep,endereco.rua,endereco.bairro,endereco.numero,endereco.complemento,endereco.estado,endereco.cidade,endereco.ID]);

    return resp.affectedRows;
}