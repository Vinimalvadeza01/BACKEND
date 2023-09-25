#Comandos Login
Select         DS_EMAIL    as Email,
            DS_CPF        as CPF,
            DS_SENHA     as Senha
    from tb_cliente
        Where DS_EMAIL=? OR DS_CPF=?
        AND DS_SENHA=?;

Select        NM_ADM        as Administrador,
            DS_SENHA    as Senha
    from tb_login_adm
        Where NM_adm=?
        AND   DS_SENHA=?;

#Comandos Cadastro
Insert Into tb_cliente(nm_nome,ds_email,ds_cpf,dt_datanasc,ds_senha,id_endereco)
    values(?,?,?,?,?,null);

Insert into tb_endereco(id_cliente,ds_cep,nm_rua,nm_bairro,ds_numero,ds_complemento,nm_estado,nm_cidade)
    values(?,?,?,?,?,?,?,?);

update tb_cliente

    set nm_nome=?,
        ds_email=?,
        ds_cpf=?,
        dt_datanasc=?,
        ds_senha=?,
        id_endereco=?

    where id_cliente=?;
 