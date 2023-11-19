import connection from "../../connection.js";

export async function consultarClientes(filtro){

    let comandoBase=`
    
        Select 	TB_CLIENTE.id_cliente 	as ID, 
        nm_nome 				as Nome, 
        ds_email 				as Email,
        ds_cpf 					as CPF,
        dt_nasc					as Nascimento,
        ds_senha				as Senha,
        qtd_pedidos				as Pedidos,
        TB_CLIENTE.id_endereco	as Endereco,
        TB_ENDERECO.id_endereco as id_endereco,
        ds_cep					as CEP,
        nm_rua					as Rua,
        nm_bairro				as Bairro,
        ds_numero				as Número,
        ds_complemento			as Complemento,
        nm_estado				as Estado,
        nm_cidade				as Cidade
        
        from TB_CLIENTE
            Left Join TB_ENDERECO
                on TB_CLIENTE.id_cliente=TB_ENDERECO.id_cliente`;

    let comandosWhere=' WHERE ';
    let comandosOrder=' ORDER BY ';

    let colunasWhere=[];
    let contWhere=0;

    let colunasOrder=[];
    let contOrder=0;

    // Filtros para o Where

    if(filtro.umPedido){

        colunasWhere[contWhere]=` qtd_pedidos>0`;
    }

    if(filtro.semPedidos){

        colunasWhere[contWhere]=` qtd_pedidos=0`;
        contWhere=contWhere+1;
    }

    if(filtro.semEndereco){

        colunasWhere[contWhere]=` TB_CLIENTE.id_endereco IS NULL`;
        contWhere=contWhere+1;
    }

    if(filtro.anoNascimento){

        let puxarAno=[];
        puxarAno.push(filtro.ano);

        colunasWhere[contWhere]=` YEAR(dt_nasc)=`+puxarAno[0];
        contWhere=contWhere+1;
    }

    if(filtro.estadoEspecifico){

        let puxarEstado=[];

        puxarEstado.push(filtro.estado);

        colunasWhere[contWhere]=` nm_estado="`+puxarEstado[0]+'"';
        contWhere=contWhere+1;
    }

    if(filtro.cidadeEspecifica){

        let puxarCidade=[];

        puxarCidade.push(filtro.cidade);

        colunasWhere[contWhere]=` nm_cidade="`+puxarCidade[0]+'"';
        contWhere=contWhere+1;
    }

    if(filtro.clienteEspecifico){

        let puxarCliente=[];

        puxarCliente.push(filtro.cliente);

        colunasWhere[contWhere]=` nm_nome like('%${puxarCliente[0]}%') OR ds_email like('%${puxarCliente[0]}%') OR ds_cpf like('%${puxarCliente[0]}%')`;
    }

    // Filtros para o order BY
    if(filtro.maisPedidos){

        colunasOrder[contOrder]=` qtd_pedidos desc`;
        contOrder=contOrder+1;
    }

    if(filtro.ordemAlfabetica){

        colunasOrder[contOrder]=` nm_nome asc`;
        contOrder=contOrder+1;
    }

    if(filtro.nascimentoMaisNovos){

        colunasOrder[contOrder]=` dt_nasc asc`;
        contOrder=contOrder+1;
    }

    if(filtro.nascimentoMaisVelhos){

        colunasOrder[contOrder]=` dt_nasc desc`;
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