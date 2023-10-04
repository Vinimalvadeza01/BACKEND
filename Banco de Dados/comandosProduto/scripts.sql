insert into tb_produto(nm_produto,id_categoria,id_animal,ds_marca,ds_peso,vl_preco,nr_desconto,bt_disponivel,dt_lancamento,nr_qntdEstoque,nr_vendas,vl_avaliacao,id_adm)
	    values(?,?,?,?,?,?,?,?,?,?,0,0.0,?);

insert into tb_imagem(ds_imagem,id_produto,nr_posicao)
        values(?,?,?);

select ID_CATEGORIA     as ID,
                DS_CATEGORIA    as Categoria
        from tb_categoria
        Where id_categoria=?

select ID_ANIMAL        as ID,
                NM_ANIMAL    as Animal
        from tb_animal
        Where id_animal=?

select ID_ADM     as ID,
                NM_ADM          as Adm,
                DS_SENHA        as Senha
        from tb_login_adm
        Where id_adm=?