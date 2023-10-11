#Listando animais
Select  ID_ANIMAL       as ID,
        NM_ANIMAL       as Animal
    from tb_animal

#Verificar se o ID do animal existe
Select  ID_ANIMAL    as ID,
        NM_ANIMAL    as Animal
    from tb_animal
    Where id_animal=?

#Consulta de produtos com filtros

    Select TB_produto.ID_produto,ID_imagem,DS_imagem,TB_categoria.ID_categoria,DS_categoria,TB_animal.ID_animal,NM_animal,NR_vendas,NR_qntdEstoque,VL_preco,NR_desconto,BT_disponivel,DT_lancamento,VL_avaliacao,QTD_favoritos,ID_adm
		from TB_produto
			Inner join TB_imagem
				ON TB_produto.ID_produto=TB_imagem.ID_produto
			Inner Join TB_categoria
				ON TB_produto.ID_categoria=TB_categoria.ID_categoria
			Inner Join TB_animal
				ON TB_produto.ID_animal=TB_animal.ID_animal

                Where NR_posicao=1
                and nr_qntdEstoque=0
				#Filtro para produtos fora de estoque
                
                and bt_disponivel=false
                #Para produtos não lançados, com ou sem data de lançamento
                
                and dt_lancamento='2099-01-01 00:00:00'
                #Filtro para produtos sem data de lançamento, não pode estar junto do filtro de produtos não lançados
                
                and dt_lancamento=?
                #Filtro por data específica
                
                ORDER BY NR_vendas desc,VL_avaliacao desc,QTD_favoritos desc,nr_qntdEstoque asc,dt_lancamento asc;
                #Filtro por vendas, avaliação e favoritos, do maior para o menor
                #Filtro de quantidade em estoque não pode estar ativo junto do filtro de estoque=0