import con from "./connection.js";

export async function consultaMaisVendidos(){
    const comando = `
        Select  TB_PRODUTO.ID_PRODUTO AS ID,    
                DS_imagem  as Capa,
                NM_produto as Nome,
                Vl_avaliacao as Avaliação,
                QTD_avaliacoes as Avaliações,
                VL_preco as Preço,
                NR_VENDAS as Vendas

                FROM            TB_PRODUTO

                Inner Join TB_imagem
					ON TB_produto.ID_produto=TB_imagem.ID_produto

                WHERE           NR_posicao=1
                ORDER BY        NR_VENDAS 	desc
    `
    const [resp] = await con.query(comando, [])
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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto

            WHERE           NR_posicao=1
            ORDER BY        vl_avaliacao 	desc`;
    
    const [resp] = await con.query(comando, []);
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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
        
        WHERE ID_ANIMAL=1
        
        ORDER BY NR_VENDAS desc, VL_AVALIACAO desc
        LIMIT 1, 12
    `
    const [resp] = await con.query(comando, [])
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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
    
        ORDER BY NR_VENDAS desc, VL_AVALIACAO desc
        LIMIT 1, 12
    `
    const [resp] = await con.query(comando, [])
    return resp;
}