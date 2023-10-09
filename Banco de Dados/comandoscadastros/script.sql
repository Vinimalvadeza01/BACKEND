

##inserir os dados pedidos na pagina de cadastro##

  INSERT INTO tb_cliente (nm_nome, ds_email, nr_cpf, dt_datanasc, ds_senha)
		VALUE (?,?,?,?,?);


##selects para a verificação dos dados e-mail e cpf para ver se os dados ja existem##

      SELECT id_cliente    as id,
          ds_cpf       as cpf
  FROM tb_cliente WHERE ds_cpf=?;

    SELECT id_cliente    as id,
          ds_email       as email
  FROM tb_cliente WHERE ds_email=?;