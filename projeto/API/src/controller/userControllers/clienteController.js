import { Router } from "express";
import { login } from "../../repository/clientRepositorys/loginRepository.js";

const endpoints=Router();

endpoints.post ('/Cadastro', async (req, resp ) => {

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

         

         const VerifcEmail =await VerificarEmail(resposta.email);

         
         if(VerifcEmail.length>0){
 
            throw new Error('Esse E-mail já foi cadastrado!');
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

        const resposta = await login(emailCPF,senha);

        if(!emailCPF){

            throw new Error('É necessário definir um email ou um CPF para validação!');
        }

        if(!senha){

            throw new Error('É necessário escrever a senha da sua conta!');
        }

        if(resposta.length==0){

            throw new Error('Usuário não encontrado!');
        }

        if(senha!==resposta[0].Senha){

            throw new Error('Senha incorreta!');
        }

        resp.send('Logado Com Sucesso');

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }   
});

export default endpoints;