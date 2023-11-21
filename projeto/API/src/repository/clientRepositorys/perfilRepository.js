import connection from '../connection.js';

export async function consultarInfsPerfil(id){

    const command=`
        Select 	nm_nome 	as Nome,
            ds_email 	as Email,
            ds_cpf		as CPF,
            dt_nasc		as Nascimento,
            ds_senha	as Senha,
            qtd_pedidos	as Pedidos,
            id_endereco as Endereco_ID
    
            from TB_CLIENTE
                WHERE id_cliente=?`;
    
    const [resp]=await connection.query(command,[id]);

    return resp;
}

export async function consultarInfsEnderecoPerfil(id){

    const command=`
        Select 	id_endereco 	as ID,
                id_cliente		as Cliente,
                ds_cep			as CEP,
                nm_rua			as Rua,
                nm_bairro		as Bairro,
                ds_numero		as Numero,
                ds_complemento	as Complemento,
                nm_estado		as Estado,
                nm_cidade		as Cidade
    
                from TB_ENDERECO
                    WHERE id_cliente=?`;

    const [resp]=await connection.query(command,[id]);

    return resp;
}