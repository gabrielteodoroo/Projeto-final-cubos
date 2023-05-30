const joi = require("joi");

const schemaUpdateUser = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  senha: joi.string().min(5).allow(null, "").messages({
    "string.min": "A senha precisa conter, no mínimo, 5 caracteres",
  }),
  cpf: joi.string().allow(null, "").messages(),
  telefone: joi.string().allow(null, "").messages(),
});

module.exports = schemaUpdateUser;
