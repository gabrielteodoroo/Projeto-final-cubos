const joi = require("joi");

const schemaUpdateClient = joi.object({
  id_cliente: joi.string().required(),
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  cpf: joi.string().max(14).required().messages({
    "any.required": "O campo cpf é obrigatório",
    "string.empty": "O campo cpf é obrigatório",
    "string.min": "O cpf precisa conter 11 caracteres",
  }),
  telefone: joi.string().max(14).required().messages({
    "any.required": "O campo telefone é obrigatório",
    "string.empty": "O campo telefone é obrigatório",
    "string.min": "O telefone precisa conter 9 caracteres",
  }),
  cep: joi.string().max(9).allow(null, "").messages({
    "string.min": "O cep precisa conter 8 caracteres",
  }),
  logradouro: joi.string().allow(null, ""),
  complemento: joi.string().allow(null, ""),
  bairro: joi.string().allow(null, ""),
  cidade: joi.string().allow(null, ""),
  estado: joi.string().allow(null, ""),
});

module.exports = schemaUpdateClient;
