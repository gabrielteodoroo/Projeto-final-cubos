const knex = require("../../services/connectionSQL");

const signInClient = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    status,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
  } = req.body;
  const usuario = req.user.id;
  try {
    const findEmail = await knex("clientes").where({ email });
    if (findEmail.length > 0) {
      return res.status(400).json("O email ja esta sendo utilizado");
    }

    const findCpf = await knex("clientes").where({ cpf });
    if (findCpf.length > 0) {
      return res.status(400).json("O cpf ja esta sendo utilizado");
    }

    const client = await knex("clientes").insert({
      usuario_id: usuario,
      nome,
      email,
      cpf,
      status,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
    });

    if (client.rowCount === 0) {
      return res.status(400).json({ mensagem: "Cliente não foi cadastrado" });
    }

    return res.status(200).json({ mensagem: "Cadastro realizado com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = signInClient;
