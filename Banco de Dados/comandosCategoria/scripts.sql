#Listando categorias
Select  ID_CATEGORIA    as ID,
        DS_CATEGORIA    as Categoria
    from tb_categoria

#Verificar se o ID da categoria existe
select  ID_CATEGORIA    as ID,
        DS_CATEGORIA    as Categoria
    from tb_categoria
    Where id_categoria=?

