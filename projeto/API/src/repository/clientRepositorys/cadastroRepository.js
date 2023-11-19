import connection from '../connection.js';


export async function Cadastro(resposta){

  let comando = 
   `
   INSERT INTO TB_CLIENTE  (nm_nome, ds_email, ds_cpf, dt_nasc, ds_senha, qtd_pedidos, id_endereco )
   VALUES (?,?,?,?,?,0, null)
  `
  const [resp] = await connection.query(comando, [
    resposta.nome,
    resposta.email,
    resposta.cpf,
    resposta.nasc,
    resposta.senha,
    resposta.pedidos,
    resposta.endereco
 ])

  resposta.id=resp.insertId
        
 return resp;
}


// gets para verificar se email, cpf são repetidos 

export async function VerificarCpf(cpf){
    const cn =
    `
    SELECT id_cliente    as id,
          ds_cpf       as cpf
  FROM TB_CLIENTE WHERE ds_cpf=?;
  `

  const [resp] = await connection.query(cn, [cpf])
  return resp;
}
