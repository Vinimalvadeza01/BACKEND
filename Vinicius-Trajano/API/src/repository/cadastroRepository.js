import {con} from './controller.js';


export async function Cadastro(resposta){
    console.log(resposta)
        const comando = 
        `
        INSERT INTO tb_cliente (nm_nome, ds_email, ds_cpf, dt_datanasc, ds_senha)
		VALUES (?,?,?,?,?)
        `
        const [resp] = await con.query(comando, [
            resposta.nome,
            resposta.email,
            resposta.cpf,
            resposta.datanasc,
            resposta.senha
            
        ])
        return resp;
}


// gets para verificar se email, cpf são repetidos 



export async function VerificarEmail(email){
    const cn =
    `
    SELECT id_cliente    as id,
          ds_email       as email
  FROM tb_cliente WHERE ds_email=?;
  `

  const [resp] = await con.query(cn, [email])
  return resp;
}

export async function VerificarCpf(cpf){
    const cn =
    `
    SELECT id_cliente    as id,
          ds_cpf       as cpf
  FROM tb_cliente WHERE ds_cpf=?;
  `

  const [resp] = await con.query(cn, [cpf])
  return resp;
}


