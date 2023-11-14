import connection from "../../connection.js";

export async function consultarClientes(filtro){

    let comandoBase=`
    
        Select 	TB_Cliente.ID_cliente 	as ID, 
        NM_nome 				as Nome, 
        DS_email 				as Email,
        DS_cpf 					as CPF,
        DT_nasc					as Nascimento,
        DS_senha				as Senha,
        QTD_pedidos				as Pedidos,
        TB_cliente.ID_endereco	as Endereco,
        TB_endereco.ID_endereco as ID_Endereco,
        ds_cep					as CEP,
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

    if(filtro.umPedido){

        colunasWhere[contWhere]=` QTD_pedidos>0`;
    }

    if(filtro.semPedidos){

        colunasWhere[contWhere]=` QTD_pedidos=0`;
        contWhere=contWhere+1;
    }

    if(filtro.semEndereco){

        colunasWhere[contWhere]=` TB_cliente.ID_Endereco IS NULL`;
        contWhere=contWhere+1;
    }

    if(filtro.anoNascimento){

        let puxarAno=[];
        puxarAno.push(filtro.ano);

        colunasWhere[contWhere]=` YEAR(DT_nasc)=`+puxarAno[0];
        contWhere=contWhere+1;
    }

    if(filtro.estadoEspecifico){

        let puxarEstado=[];

        puxarEstado.push(filtro.estado);

        colunasWhere[contWhere]=` NM_estado="`+puxarEstado[0]+'"';
        contWhere=contWhere+1;
    }

    if(filtro.cidadeEspecifica){

        let puxarCidade=[];

        puxarCidade.push(filtro.cidade);

        colunasWhere[contWhere]=` NM_cidade="`+puxarCidade[0]+'"';
        contWhere=contWhere+1;
    }

    if(filtro.clienteEspecifico){

        let puxarCliente=[];

        puxarCliente.push(filtro.cliente);

        colunasWhere[contWhere]=` NM_nome like('%${puxarCliente[0]}%') OR DS_email like('%${puxarCliente[0]}%') OR DS_cpf like('%${puxarCliente[0]}%')`;
    }

    // Filtros para o order BY
    if(filtro.maisPedidos){

        colunasOrder[contOrder]=` QTD_pedidos desc`;
        contOrder=contOrder+1;
    }

    if(filtro.ordemAlfabetica){

        colunasOrder[contOrder]=` nm_nome asc`;
        contOrder=contOrder+1;
    }

    if(filtro.nascimentoMaisNovos){

        colunasOrder[contOrder]=` DT_nasc asc`;
        contOrder=contOrder+1;
    }

    if(filtro.nascimentoMaisVelhos){

        colunasOrder[contOrder]=` DT_nasc desc`;
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

    const [resp]= await connection.query(comandoFinal,[filtro.semPedidos,filtro.semEndereco,filtro.anoNascimento,filtro.ano,filtro.estadoEspecifico,filtro.estado,filtro.cidadeEspecifica,filtro.cidade,filtro.clienteEspecifico,filtro.cliente,filtro.ordemAlfabetica,filtro.nascimentoMaisNovos,filtro.nascimentoMaisVelhos]);

    return resp;
}