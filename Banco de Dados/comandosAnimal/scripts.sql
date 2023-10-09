#Listando animais
Select  ID_ANIMAL       as ID,
        NM_ANIMAL       as Animal
    from tb_animal

#Verificar se o ID do animal existe
Select  ID_ANIMAL    as ID,
        NM_ANIMAL    as Animal
    from tb_animal
    Where id_animal=?