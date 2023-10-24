import connection from './connection.js';

export async function consultarClientes(filtro){

    let comandoBase=`
    
        Select 	TB_Cliente.ID_cliente 	as ID, 
        NM_nome 				as Nome, 
        DS_email 				as Email,
        DS_cpf 					as CPF,
        DT_nasc					as Nascimento,
        DS_senha				as Senha,
        QTD_pedidos				as Pedidos,
        TB_cliente.ID_endereco	as ID_Endereco,
        NR_cep					as CEP,
        NM_rua					as Rua,
        NM_bairro				as Bairro,
        DS_numero				as Número,
        DS_complemento			as Complemento,
        NM_estado				as Estado,
        NM_cidade				as Cidade
        
        from TB_cliente
            Left Join TB_endereco
                on TB_cliente.ID_cliente=TB_endereco.ID_cliente`;

    let comandosWhere=' WHERE ';
    let comandosOrder=' ORDER BY ';

    let colunasWhere=[];
    let contWhere=0;

    let colunasOrder=[];
    let contOrder=0;

    // Filtros para o Where
    if(filtro.semPedidos){

        colunasWhere[contWhere]=` QTD_pedidos=0`;
        contWhere=contWhere+1;
    }

    if(filtro.semEndereco){

        colunasWhere[contWhere]=` TB_cliente.ID_Endereco IS NULL`;
        contWhere=contWhere+1;
    }

    if(filtro.anoNascimento){

        colunasWhere[contWhere]=` DT_nasc between ? and ?`;
        contWhere=contWhere+1;
    }

    if(filtro.estadoEspecifico){

        colunasWhere[contWhere]=` NM_estado=?`;
        contWhere=contWhere+1;
    }

    if(filtro.cidadeEspecifica){

        colunasWhere[contWhere]=` NM_cidade=?`;
        contWhere=contWhere+1;
    }

    // Filtros para o order BY
    if(filtro.maisPedidos){

        colunasOrder[contOrder]=` QTD_pedidos desc`;
        contOrder=contOrder+1;
    }

    if(filtro.ordemAlfabetica){

        colunasOrder[contOrder]=` NM_nome asc`;
        contOrder=contOrder+1;
    }

    if(filtro.nascimentoMaisNovos){

        colunasOrder[contOrder]=` DT_nasc desc`;
        contOrder=contOrder+1;
    }

    if(filtro.nascimentoMaisVelhos){

        colunasOrder[contOrder]=` DT_nasc asc`;
        contOrder=contOrder+1;
    }

    // Alterando os comandos de Where e ORDER BY com os filtros que foram aplicados
    
    // Where
    for(let item of colunasWhere){

        if(item!==colunasWhere[0]){
            
            comandosWhere=comandosWhere+' AND '+item;
        }

        else{

            comandosWhere=' WHERE '+item;
        }
    }

    for(let item of colunasOrder){

        if(item!==colunasOrder[colunasOrder.length-1] && item!=undefined){

            comandosOrder=comandosOrder+item+','
        }

        else{

            comandosOrder=comandosOrder+item
        }
    }

    // Se nenhum dos valores de WHERE for true, seta ele como sendo nulo, o mesmo para ORDER BY
    if(comandosWhere==' WHERE '){

        comandosWhere='';
    }

    if(comandosOrder==' ORDER BY '){

        comandosOrder='';
    }

    let comandoFinal=comandoBase+comandosWhere+comandosOrder;

    const [resp]= await connection.query(comandoFinal,[filtro.semPedidos,filtro.semEndereco,filtro.anoNascimento,filtro.dataInicio,filtro.dataFinal,filtro.estadoEspecifico,filtro.estado,filtro.cidadeEspecifica,filtro.cidade,filtro.clienteEspecifico,filtro.ordemAlfabetica,filtro.nascimentoMaisNovos,filtro.nascimentoMaisVelhos]);

    return resp;
}