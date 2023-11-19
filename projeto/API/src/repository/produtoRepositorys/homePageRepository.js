import connection from "../connection.js";

export async function consultaMaisVendidos(){
    const comando = `
        Select  TB_PRODUTO.id_produto AS ID,    
                ds_imagem  as Capa,
                nm_produto as Nome,
                vl_avaliacao as Avaliação,
                qtd_avaliacoes as Avaliações,
                vl_preco as Preço,
                nr_vendas as Vendas,
                bt_disponivel as Disponivel

                FROM            TB_PRODUTO

                Inner Join TB_IMAGEM
					ON TB_PRODUTO.id_produto=TB_IMAGEM.id_produto

                WHERE           nr_posicao=1
                AND             nr_vendas>0
                AND             bt_disponivel=true
                ORDER BY        nr_vendas 	desc

                LIMIT 0,20
    `
    const [resp] = await connection.query(comando, [])
    return resp;
}

export async function consultaMelhorAval(){
    const comando = 
`        Select  TB_PRODUTO.id_produto AS ID,    
            ds_imagem  as Capa,
            nm_produto as Nome,
            vl_avaliacao as Avaliação,
            qtd_avaliacoes as Avaliações,
            vl_preco as Preço,
            nr_vendas as Vendas,
            bt_disponivel as Disponivel

            FROM            TB_PRODUTO

            Inner Join TB_IMAGEM
                ON TB_PRODUTO.id_produto=TB_IMAGEM.id_produto

            WHERE           nr_posicao=1
            AND             qtd_avaliacoes>0
            AND             bt_disponivel=true

            ORDER BY        vl_avaliacao 	desc
            LIMIT 0,20`;
    
    const [resp] = await connection.query(comando, []);
    return resp;
}

export async function consultaMVCachorro(){
    const comando = `
    
    Select  TB_PRODUTO.id_produto AS ID,    
            ds_imagem  as Capa,
            nm_produto as Nome,
            vl_avaliacao as Avaliação,
            qtd_avaliacoes as Avaliações,
            vl_preco as Preço,
            nr_vendas as Vendas,
            bt_disponivel as Disponivel

            FROM            TB_PRODUTO

            Inner Join TB_IMAGEM
                ON TB_PRODUTO.id_produto=TB_IMAGEM.id_produto
        
            WHERE id_animal=1
            AND nr_vendas>0 OR 
            qtd_avaliacoes>0
            AND id_animal=1
            AND bt_disponivel=true
        
            ORDER BY vl_avaliacao desc,nr_vendas desc
            LIMIT 0, 20
    `
    const [resp] = await connection.query(comando, [])
    return resp;
}

export async function consultaMVGato(){
    const comando = `
    Select  TB_PRODUTO.id_produto AS ID,    
            nm_imagem  as Capa,
            nm_produto as Nome,
            vl_avaliacao as Avaliação,
            qtd_avaliacoes as Avaliações,
            vl_preco as Preço,
            nr_vendas as Vendas,
            bt_disponivel as Disponivel

            FROM            TB_PRODUTO

            Inner Join TB_IMAGEM
                ON TB_PRODUTO.id_produto=TB_IMAGEM.id_produto
    
            WHERE id_animal=2
            AND nr_vendas>0 OR 
            qtd_avaliacoes>0
            AND id_animal=2
            AND bt_disponivel=true

            ORDER BY vl_avaliacao desc,nr_vendas desc
            LIMIT 0, 20
    `
    const [resp] = await connection.query(comando, [])
    return resp;
}