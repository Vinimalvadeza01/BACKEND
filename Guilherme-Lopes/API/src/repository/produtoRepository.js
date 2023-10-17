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