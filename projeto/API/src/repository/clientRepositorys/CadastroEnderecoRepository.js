import connection from '../connection.js';

export async function CEndereco(resposta){

    let comando= 
    `insert into TB_ENDERECO(id_cliente, ds_cep, nm_rua, nm_bairro, ds_numero, ds_complemento, nm_estado, nm_cidade)
	values(?,?,?,?,?,?,?,?);`

    const [resp]= await connection.query(comando, [
        resposta.cliente,
        resposta.cep,
        resposta.rua,
        resposta.bairro,
        resposta.numero,
        resposta.complemento,
        resposta.estado,
        resposta.cidade
    ])

    resposta.id=resp.insertId;

    return resp;
}
