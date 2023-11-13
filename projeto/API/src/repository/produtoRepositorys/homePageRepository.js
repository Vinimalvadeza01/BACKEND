import connection from "../connection.js";

export async function consultaMaisVendidos(){
    const comando = `
        Select  TB_PRODUTO.ID_PRODUTO AS ID,    
                DS_imagem  as Capa,
                NM_produto as Nome,
                Vl_avaliacao as Avaliação,
                QTD_avaliacoes as Avaliações,
                VL_preco as Preço,
                NR_VENDAS as Vendas,
                bt_disponivel as Disponivel

                FROM            TB_PRODUTO

                Inner Join TB_imagem
					ON TB_produto.ID_produto=TB_imagem.ID_produto

                WHERE           NR_posicao=1
                AND             nr_vendas>0
                AND             bt_disponivel=true
                ORDER BY        NR_VENDAS 	desc

                LIMIT 0,20
    `
    const [resp] = await connection.query(comando, [])
    return resp;
}

export async function consultaMelhorAval(){
    const comando = 
`        Select  TB_PRODUTO.ID_PRODUTO AS ID,    
            DS_imagem  as Capa,
            NM_produto as Nome,
            Vl_avaliacao as Avaliação,
            QTD_avaliacoes as Avaliações,
            VL_preco as Preço,
            NR_VENDAS as Vendas,
            bt_disponivel as Disponivel

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto

            WHERE           NR_posicao=1
            AND             qtd_avaliacoes>0
            AND             bt_disponivel=true

            ORDER BY        vl_avaliacao 	desc
            LIMIT 0,20`;
    
    const [resp] = await connection.query(comando, []);
    return resp;
}

export async function consultaMVCachorro(){
    const comando = `
    
    Select  TB_PRODUTO.ID_PRODUTO AS ID,    
            DS_imagem  as Capa,
            NM_produto as Nome,
            Vl_avaliacao as Avaliação,
            QTD_avaliacoes as Avaliações,
            VL_preco as Preço,
            NR_VENDAS as Vendas,
            bt_disponivel as Disponivel

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
        
            WHERE ID_ANIMAL=1
            AND nr_vendas>0 OR 
            qtd_avaliacoes>0
            AND id_animal=1
            AND bt_disponivel=true
        
            ORDER BY VL_AVALIACAO desc,NR_VENDAS desc
            LIMIT 0, 20
    `
    const [resp] = await connection.query(comando, [])
    return resp;
}

export async function consultaMVGato(){
    const comando = `
    Select  TB_PRODUTO.ID_PRODUTO AS ID,    
            DS_imagem  as Capa,
            NM_produto as Nome,
            Vl_avaliacao as Avaliação,
            QTD_avaliacoes as Avaliações,
            VL_preco as Preço,
            NR_VENDAS as Vendas,
            bt_disponivel as Disponivel

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
    
            WHERE ID_ANIMAL=2
            AND nr_vendas>0 OR 
            qtd_avaliacoes>0
            AND id_animal=2
            AND bt_disponivel=true

            ORDER BY VL_AVALIACAO desc,NR_VENDAS desc
            LIMIT 0, 20
    `
    const [resp] = await connection.query(comando, [])
    return resp;
}