import connection from '../connection.js';

export async function consultaCaesHeader(){

    const command=`
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
                
			WHERE id_animal=1
            AND nr_vendas>0
            AND bt_disponivel=true
            
            ORDER BY RAND()
            LIMIT 0,4
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}

export async function consultaGatosHeader(){

    const command=`
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
                
			WHERE id_animal=2
            AND nr_vendas>0
            
            ORDER BY RAND()
            LIMIT 0,4
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}

export async function consultaPassarosHeader(){

    const command=`
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
                
			WHERE id_animal=3
            AND nr_vendas>0
            AND bt_disponivel=true

            ORDER BY RAND()
            LIMIT 0,4
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}

export async function consultaPeixesHeader(){

    const command=`
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
                
			WHERE id_animal=4
            AND nr_vendas>0
            AND bt_disponivel=true
            
            ORDER BY RAND()
            LIMIT 0,4
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}

export async function consultaOutrosAnimaisHeader(){

    const command=`
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
                
			WHERE id_animal=5
            AND nr_vendas>0
            AND bt_disponivel=true
            
            ORDER BY RAND()
            LIMIT 0,4
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}