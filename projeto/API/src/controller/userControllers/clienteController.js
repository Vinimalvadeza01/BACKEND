import { Router } from "express";
import { login } from "../../repository/clientRepositorys/loginRepository.js";
import { Cadastro, VerificarCpf } from "../../repository/clientRepositorys/cadastroRepository.js";
import { alterarCliente } from "../../repository/clientRepositorys/alterarRepository.js";
import { consultarInfsPerfil } from "../../repository/clientRepositorys/perfilRepository.js";

const endpoints=Router();

endpoints.post ('/cliente/Cadastro', async (req, resp ) => {

    try {
        const resposta = req.body;

        // Verificação de campos nulos
        if(!resposta.nome){

            throw new Error('O nome é obrigatório!');
        }
        
        if(!resposta.email){

            throw new Error('O email e obrigatorio!');
        }
        
        if(!resposta.cpf){

            throw new Error('O cpf é obrigatório!');
        }
        
        if(!resposta.senha){

            throw new Error('A senha é obrigatório!');
        }

        if(!resposta.nasc){

            throw new Error('A data de nascimento é obrigatório!');
        }
        
         // Verifica se o cliente nao esta repetindo dados de outro cliente
         const VerifcCpf =await VerificarCpf(resposta.cpf);

        if(VerifcCpf.length>0){
 
            throw new Error('Já existe um cadastro feito com esse CPF!');
        }

        //Confrima senha
        const respsd = await Cadastro(resposta);
        resp.send(respsd)
    } 
    
    catch (err) 
    {
        resp.status(404).send({
            erro:err.message
        });
    }

});

endpoints.post('/usuario/login', async (req, resp) =>{

    try{
        const {emailCPF,senha} = req.body;

        const [resposta] = await login(emailCPF,senha);

        if(!emailCPF){

            throw new Error('É necessário definir um email ou um CPF para validação!');
        }

        if(!senha){

            throw new Error('É necessário escrever a senha da sua conta!');
        }

        if(!resposta){

            throw new Error('Usuário não encontrado!');
        }

        if(senha!==resposta.Senha){

            throw new Error('Senha incorreta!');
        }

        resp.send(resposta);

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }   
});

endpoints.put('/cliente/alterar', async (req,resp) => {

    try{

        const cliente=req.body;

        if(!cliente.nome){

            throw new Error('Não foi possível alterar o cliente pois a informação "Nome" do cliente não foi encontrada');
        }
  
        if(!cliente.email){

            throw new Error('Não foi possível alterar o cliente pois a informação "Email" do cliente não foi encontrada');
        }

        if(!cliente.cpf){

            throw new Error('Não foi possível alterar o cliente pois a informação "CPF" do cliente não foi encontrada');
        }

        if(!cliente.nasc){

            throw new Error('Não foi possível alterar o cliente pois a informação "Data de Nascimento" do cliente não foi encontrada');
        }

        if(!cliente.senha){

            throw new Error('Não foi possível alterar o cliente pois a informação "Senha" do cliente não foi encontrada');
        }

        if(cliente.pedidos===undefined){

            throw new Error('Não foi possível alterar o cliente pois a informação "Quantidade de Pedidos" do cliente não foi encontrada');
        }
   
        if(!cliente.endereco){

            throw new Error('Não foi possível alterar o cliente pois o endereço não existe em nossos registros');
        }

        if(!cliente.ID){

            throw new Error('Defina qual cliente está querendo alterar as informações!');
        }

        const alterarEndereco=alterarCliente(cliente);

        if(alterarEndereco===0){

            throw new Error('Não foi possível alterar o endereço');
        }

        resp.send(cliente);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

endpoints.get('/cliente/perfil/consulta/:id', async (req,resp) => {

    try{
        
        const id=req.params.id;

        const [respostaConsulta]=await consultarInfsPerfil(id);

        resp.send(respostaConsulta);
    }

    catch(err){

        resp.status(404).send({

            erro:err.message
        });
    }
});

export default endpoints;