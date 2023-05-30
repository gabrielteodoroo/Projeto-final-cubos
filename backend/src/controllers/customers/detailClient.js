const knex = require("../../services/connectionSQL");

const detailClient = async (req, res) => {
  try {
    const cliente_id = req.params.cliente_id;
    const usuario_id = req.user.id;

    const oneClient = await knex("clientes")
      .where({
        id: cliente_id,
        usuario_id: usuario_id,
      })
      .select(
        "id",
        "nome",
        "email",
        "cpf",
        "telefone",
        "cep",
        "logradouro",
        "complemento",
        "bairro",
        "cidade",
        "estado"
      )
      .returning("*");
    if (oneClient.length === 0) {
      return res.status(401).json({
        message: "Cliente não encontrado",
      });
    }

    return res.status(200).json(oneClient[0]);
  } catch (error) {
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = detailClient;
