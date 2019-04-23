create table categoria (
  id serial PRIMARY KEY,
  nome VARCHAR (50) UNIQUE NOT NULL
);

insert into categoria(nome) values('Educação');
insert into categoria(nome) values('Alimentação');
insert into categoria(nome) values('Moradia');
insert into categoria(nome) values('Entretenimento');
insert into categoria(nome) values('Veículo');
insert into categoria(nome) values('Vestuário');
insert into categoria(nome) values('Cuidados pessoais');

select * from categoria;
-- delete from categoria;

-----------------------------------------------------------------------

CREATE TABLE lancamento (
  id serial primary key,
  estabelecimento character varying(100) NOT NULL,
  data date,
  valor double precision,
  categoria_id integer
  FOREIGN KEY (categoria_id) REFERENCES categoria (id)
);  

select * from lancamento;

insert into lancamento(estabelecimento, data, valor, categoria_id) values('TENDTUDO 09/10', '23/06/2018', 103.22, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('FERREIRA COSTA 08/10', '07/07/2018', 150.05, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('FERREIRA COSTA 08/10', '22/07/2018', 117.61, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('ENOPP S*TOP MOVEIS 07/10', '18/08/2018', 204.7, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('COLCHÕES 06/10', '06/10/2018', 34, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('EBANX-UDA 06/09', '06/09/2018', 92.4, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('FARMO 04/04', '20/11/2018', 91.25, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('LIVRARIA 03/03', '08/12/2018', 97.34, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('SARAIVA 03/06', '08/12/2018', 38.35, 3); 
insert into lancamento(estabelecimento, data, valor, categoria_id) values('LOJAS AMERICANAS', '21/12/2018', 244.82, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('VIA VAREJO', '22/12/2018', 259.9, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('DOCE LAR ENXOVAIS 03/04', '22/12/2018', 38.39, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('CRA CLOVES REBOQUE 03/03', '28/12/2018', 145.68, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('HAIR NATA', '26/01/2019', 90, 3);
insert into lancamento(estabelecimento, data, valor, categoria_id) values('PANIFICADORA AVENIDA', '03/02/2019', 14.93, 3);