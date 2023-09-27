create database VEGPET_DB;
use VEGPET_DB;

create table tb_cliente (
    id_cliente             int primary key auto_increment not null,
    nm_nome             varchar(100)not null,
    ds_email             varchar(100) not null,
    ds_cpf                 varchar(11) not null,
    dt_datanasc         date not null,
    ds_senha             varchar(30) not null,
    id_endereco            int
);

alter table tb_cliente
add foreign key (id_endereco) references tb_endereco(id_endereco);

select * from tb_cliente
inner join tb_endereco
    on tb_cliente.id_endereco=tb_endereco.id_endereco; 

create table tb_endereco (
    id_endereco         int primary key auto_increment not null,
    id_cliente             int not null,
    ds_cep                 varchar (8) not null,
    nm_rua                 varchar (100) not null,
    nm_bairro             varchar (100) not null,
    ds_numero             varchar (5) not null,
    ds_complemento        varchar(100),
    nm_estado             varchar (50) not null,
    nm_cidade             varchar (50) not null,

    foreign key (id_cliente) references tb_cliente (id_cliente)
);

select * from tb_cliente
inner join tb_endereco
    on tb_endereco.id_cliente=tb_cliente.id_cliente;

    create table tb_login_adm(
	id_adm		int primary key auto_increment,
	nm_adm		varchar(100),
    ds_senha	varchar(11)
);