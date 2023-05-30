const knex = require("../../services/connectionSQL");

const updateClient = async (req, res) => {
  try {
    const {
      id_cliente,
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      endereco,
      complemento,
      bairro,
      cidade,
      estado,
    } = req.body;

    const userId = req.user.id;

    const findClient = await knex("clientes").where({ id: id_cliente });

    if (findClient[0].usuario_id !== userId) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const findEmail = await knex("clientes").where({ email });
    if (findEmail.length > 0 && findClient[0].email !== findEmail[0].email) {
      return res.status(400).json({
        message:
          "O e-mail informado já está sendo utilizado por outro cliente.",
      });
    }

    const findCpf = await knex("clientes").where({ cpf });
    if (findCpf.length > 0 && findCpf[0].cpf !== findClient[0].cpf) {
      return res.status(400).json({
        message: "O CPF informado já está sendo utilizado",
      });
    }

    const findPhone = await knex("clientes").where({ telefone });
    if (
      findPhone.length > 0 &&
      findPhone[0].telefone !== findClient[0].telefone
    ) {
      return res.status(400).json({
        message: "O telefone informado já está sendo utilizado",
      });
    }

    const client = {
      nome,
      email,
      cpf,
      telefone,
      cep: !cep ? findClient[0].cep : cep,
      logradouro: !logradouro ? findClient[0].logradouro : logradouro,
      endereco: !endereco ? findClient[0].endereco : endereco,
      complemento: !complemento ? findClient[0].complemento : complemento,
      bairro: !bairro ? findClient[0].bairro : bairro,
      cidade: !cidade ? findClient[0].cidade : cidade,
      estado: !estado ? findClient[0].estado : estado,
    };

    const update = await knex("clientes")
      .where({ id: id_cliente })
      .update(client);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = updateClient;
