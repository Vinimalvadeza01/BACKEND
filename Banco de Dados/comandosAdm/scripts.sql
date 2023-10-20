#Consulta adms

 Select 
		nm_adm   	as 		Adm,	
        ds_senha   		as  	Senha
		from tb_login_adm
		where nm_adm=? 
        and ds_senha=?