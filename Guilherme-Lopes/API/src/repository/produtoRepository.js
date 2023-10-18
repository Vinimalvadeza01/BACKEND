import con from "./connection.js";

export async function consultaMaisVendidos(){
    const comando = `
Select  ID_PRODUTO,     NR_VENDAS
	    FROM            TB_PRODUTO
        ORDER BY        NR_VENDAS 	desc
    `
    const [resp] = await con.query(comando, [])
    return resp;
}

export async function consultaMelhorAval(){
    const comando = 
`SELECT    ID_PRODUTO, VL_AVALIACAO
        FROM TB_PRODUTO
        ORDER BY VL_AVALIACAO desc
        LIMIT 1, 12`;
    
    const [resp] = await con.query(comando, []);
    return resp;
}