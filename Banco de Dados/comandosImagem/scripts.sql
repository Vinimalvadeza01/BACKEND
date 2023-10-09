#Inserir nova imagem
insert into tb_imagem(ds_imagem,id_produto,nr_posicao)
    values(?,?,?);

#Verificar se o produto existe
select ID_IMAGEM,ID_PRODUTO,NR_POSICAO
    from tb_imagem

    WHERE   id_produto=?
    AND     nr_posicao=?