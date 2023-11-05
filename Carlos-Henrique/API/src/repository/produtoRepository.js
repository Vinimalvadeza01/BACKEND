import connection from './connection.js'; 

export async function inserirProduto(produto){

    let command=`
        insert into tb_produto(nm_produto,id_categoria,id_animal,ds_marca,ds_produto,ds_peso,vl_preco,nr_desconto,bt_disponivel,dt_cadastro,dt_lancamento,nr_qntdEstoque,nr_vendas,vl_avaliacao,qtd_avaliacoes,qtd_favoritos,id_adm)
	    values(?,?,?,?,?,?,?,?,?,?,?,?,0,0.0,0,0,?)`;
    
    const [resp]=await connection.query(command,[produto.nome,produto.categoria,produto.animal,produto.marca,produto.descricao,produto.peso,produto.preco,produto.desconto,produto.disponivel,produto.cadastro,produto.lancamento,produto.estoque,produto.adm]);

    produto.id=resp.insertId;

    return resp;
}

// Verifica se há um produto com mesmo nome

export async function verificarNomeProduto(nome){

    let command=`
    
        select ID_PRODUTO   as ID,
                NM_PRODUTO  as Nome

        from tb_produto
        where nm_produto=?
    `;

    const [resp]= await connection.query(command,[nome]);

    return resp;
}

// Verificar se o id de um determinado produto existe, para inserção de imagem

export async function verificarProduto(id){

    let command=`
    
        Select ID_PRODUTO
            from tb_produto

            WHERE id_produto=?
    `;

    const [resp]=await connection.query(command,[id]);
    
    return resp;
}

// Comandos de consulta adm
export async function consultarProdutos(filtro){

    let comandoBase=`    
            Select 
                TB_produto.ID_produto       as ID,
                DS_imagem                   as Capa,
                TB_produto.id_categoria     as Categoria_ID,
                DS_categoria                as Categoria,
                NM_produto                  as Nome,
                TB_PRODUTO.id_animal        as Animal_ID,
                NM_animal                   as Animal,
                ds_produto                  as Descrição,
                NR_vendas                   as Vendas,
                NR_qntdEstoque              as Estoque,
                VL_preco                    as Preço,
                NR_desconto                 as Desconto,
                BT_disponivel               as Disponível,
                dt_cadastro                 as Cadastro,
                DT_lancamento               as Lançamento,
                VL_avaliacao                as Avaliação,
                qtd_avaliacoes              as Avaliações,
                QTD_favoritos               as Favoritos,
                NM_adm                      as Adm,
                TB_PRODUTO.id_adm           as Adm_ID

                from TB_produto

                    Inner join TB_imagem
                        ON TB_produto.ID_produto=TB_imagem.ID_produto
                    Inner Join TB_categoria
                        ON TB_produto.ID_categoria=TB_categoria.ID_categoria
                    Inner Join TB_animal
                        ON TB_produto.ID_animal=TB_animal.ID_animal
                    Inner Join TB_login_adm
						ON	TB_produto.ID_adm=TB_login_adm.ID_adm

                        Where NR_posicao=1 `;

    // Filtros: 
    // Mais Vendidos(Order BY desc), 
    // Melhor Avaliados(Order BY desc), 
    // Mais Favoritados(ORDER BY desc), 
    // Fora de estoque (Where estoque=0), 
    // Menor em estoque (Order BY asc), 
    // Mais recentes (Order BY  dt_lancamento asc), 
    // Não Lançados (Where bt_disponivel=false),
    // Sem lançamento (Where dt_lancamento=2099-01-01),
    // Data específica (Where dt_lancamento=?)

    let comandoCondicao=``;
    if(filtro.semEstoque){

        comandoCondicao=comandoCondicao+` and nr_qntdEstoque=0 `
    }                        
    
    if(filtro.naoLancados){

        comandoCondicao=comandoCondicao+` and bt_disponivel=false `;
    }

    if(filtro.semLancamento){

        comandoCondicao=comandoCondicao+` and DATE(dt_lancamento)='2099-01-01' `
    }
    
    if(filtro.porCategoria){

        let puxarIDCategoria=[];

        puxarIDCategoria.push(filtro.categoria);

        comandoCondicao=comandoCondicao+` and tb_produto.id_categoria=${filtro.categoria}`;
    }

    if(filtro.porAnimal){

        let puxarIDAnimal=[];

        puxarIDAnimal.push(filtro.animal);

        comandoCondicao=comandoCondicao+` and TB_PRODUTO.id_animal=${filtro.animal}`;
    }

    if(filtro.porAdministrador){

        let puxarIDAdm=[];

        puxarIDAdm.push(filtro.adm);

        comandoCondicao=comandoCondicao+` and TB_LOGIN_ADM.id_adm=${filtro.adm}`;
    }

    if(filtro.cadastroEspecifico){

        const dataEspecificada = new Date(filtro.dataEspecifica); 

        const dataFormatada = dataEspecificada.toISOString().split('T')[0];

        comandoCondicao=comandoCondicao+` and dt_cadastro='${dataFormatada}'`;
    }

    if(filtro.produtoEspecifico){

        const puxarProduto=[];

        puxarProduto.push(filtro.produto);

        comandoCondicao=comandoCondicao+` and nm_produto like('%${puxarProduto[0]}%') OR TB_produto.id_produto like('%${puxarProduto[0]}%')`;
    }

    let comandoOrder=`ORDER BY `;
    let contarPosicoes=0;
    let colunas=[];

    if(filtro.maisVendidos){

        colunas[contarPosicoes]=`NR_vendas desc`;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.melhorAvaliados){

        colunas[contarPosicoes]=`VL_avaliacao desc`;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.maisFavoritados){

        colunas[contarPosicoes]=`QTD_favoritos desc`;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.menorEstoque){

        colunas[contarPosicoes]=`NR_qntdEstoque asc`;
        comandoCondicao=comandoCondicao+` and NR_qntdEstoque!=0 `;

        contarPosicoes=contarPosicoes+1;
    }

    if(filtro.maisRecentes){

        colunas[contarPosicoes]=`dt_cadastro asc`;

        contarPosicoes=contarPosicoes+1;
    }

    for(let item of colunas){

        if(item!==colunas[colunas.length-1] && item!=undefined){

            comandoOrder=comandoOrder+item+','
        }

        else{

            comandoOrder=comandoOrder+item
        }
    }

    // Caso nenhum dos valores anteriores seja true, seta o comandoOrder como sendo vazio para não dar erro
    if(comandoOrder=='ORDER BY '){

        comandoOrder='';
    }

    // #Filtro de quantidade em estoque não pode estar ativo junto do filtro de estoque=0`;
    let command=comandoBase+comandoCondicao+comandoOrder;

    const [resp]=await connection.query(command,[filtro.semEstoque,filtro.naoLancados,filtro.semLancamento,filtro.porCategoria, filtro.categoria,filtro.porAnimal,filtro.animal,filtro.porAdministrador,filtro.adm,filtro.cadastroEspecifico,filtro.dataEspecifica,filtro.produtoEspecifico,filtro.produto,filtro.maisVendidos,filtro.maisFavoritados,filtro.menorEstoque,filtro.maisRecentes]);

    return resp;
}

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
                AND             nr_vendas>0
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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto

            WHERE           NR_posicao=1
            AND             qtd_avaliacoes>0
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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
        
            WHERE ID_ANIMAL=1
            AND nr_vendas>0 OR 
            qtd_avaliacoes>0
            AND id_animal=1
        
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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
    
            WHERE ID_ANIMAL=2
            AND nr_vendas>0 OR 
            qtd_avaliacoes>0
            AND id_animal=2

            ORDER BY VL_AVALIACAO desc,NR_VENDAS desc
            LIMIT 0, 20
    `
    const [resp] = await connection.query(comando, [])
    return resp;
}

export async function consultaCaesHeader(){

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
                
			WHERE id_animal=1
            AND nr_vendas>0
            
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
            NR_VENDAS as Vendas

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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
                
			WHERE id_animal=4
            AND nr_vendas>0
            
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
            NR_VENDAS as Vendas

            FROM            TB_PRODUTO

            Inner Join TB_imagem
                ON TB_produto.ID_produto=TB_imagem.ID_produto
                
			WHERE id_animal=5
            AND nr_vendas>0
            
            ORDER BY RAND()
            LIMIT 0,4
    `;

    const [resp]=await connection.query(command,[]);

    return resp;
}

export async function consultarProduto(id){

    let command = 
        `Select 
            TB_produto.ID_produto       as ID,
            TB_produto.id_categoria     as Categoria_ID,
            DS_categoria                as Categoria,
            NM_produto                  as Nome,
            TB_PRODUTO.id_animal        as Animal_ID,
            nm_animal                   as Animal,
            ds_produto                  as Descrição,
            NR_vendas                   as Vendas,
            NR_qntdEstoque              as Estoque,
            VL_preco                    as Preço,
            NR_desconto                 as Desconto,
            BT_disponivel               as Disponível,
            dt_cadastro                 as Cadastro,
            DT_lancamento               as Lançamento,
            VL_avaliacao                as Avaliação,
            QTD_favoritos               as Favoritos,
            NM_adm                      as Adm,
            TB_PRODUTO.id_adm           as Adm_ID

        from TB_produto

            Inner Join TB_categoria
                ON TB_produto.ID_categoria=TB_categoria.ID_categoria
            Inner Join TB_animal
                ON TB_produto.ID_animal=TB_animal.ID_animal
            Inner Join TB_login_adm
                ON	TB_produto.ID_adm=TB_login_adm.ID_adm
                
            Where TB_produto.ID_produto=?`;

    const [resp]=await connection.query(command,[id]);

    return resp;
}