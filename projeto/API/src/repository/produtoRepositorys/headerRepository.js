import connection from '../connection.js';

export async function consultaCaesHeader(){

    const command=`
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
    Select  TB_PRODUTO.id_produto AS ID,    
            ds_imagem  as Capa,
            nm_produto as Nome,
            vl_avaliacao as Avaliação,
            qtd_avaliacoes as Avaliações,
            vl_preco as Preço,
            nr_vendas as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_IMAGEM
                ON TB_PRODUTO.id_produto=TB_IMAGEM.id_produto
                
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
                
			WHERE id_animal=5
            AND nr_vendas>0
            AND bt_disponivel=true
            
            ORDER BY RAND()
            LIMIT 0,4
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}