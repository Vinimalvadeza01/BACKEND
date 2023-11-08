import {con} from './connection.js';



export async function Endereco(resposta){

    let comando= 
    `insert into TB_ENDERECO(ds_cep, nm_rua, nm_bairro, ds_numero, ds_complemento, nm_estado, nm_cidade)
	value(?,?,?,?,?,?,?);`

    const [resp]= await con.query(comando, [
        resposta.cep,
        resposta.rua,
        resposta.bairro,
        resposta.numero,
        resposta.complemento,
        resposta.estado,
        resposta.cidade
    ])
    return resp;

    



}
