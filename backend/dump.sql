create database Desafio_Final_Modulo_5_BACKEND;

CREATE TABLE "usuarios"
(
  "id" serial primary key,
  "nome" text not null,
  "email" text not null unique,
  "senha" text not null,
  "cpf" char(14) unique,
  "telefone" char(14)
);

CREATE TABLE "clientes"
(
  "id" serial primary key,
  "nome" text not null,
  "email" text not null,
  "status" text not null,
  "cpf" char(14) not null unique,
  "telefone" char(14) not null,
  "cep" char(8),
  "logradouro" text,
  "complemento" text,
  "bairro" text,
  "cidade" text,
  "estado" text,
  "usuario_id" integer references usuarios(id)
);

CREATE TABLE "cobrancas"
(
  "id" serial primary key,
  "usuario_id" integer references usuarios(id),
  "cliente_id" integer references clientes(id),
  "nome_cliente" text not null,
  "descricao" text,
  "status" text not null,
  "valor" integer,
  "vencimento" date
);