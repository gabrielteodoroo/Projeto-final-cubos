const knex = require("../../services/connectionSQL");

const detailStatusClient = async (req, res) => {
  try {
    const { status } = req.params;
    const usuario_id = req.user.id;

    if (status === "Em dia") {
      const upToDateClient = await knex("clientes").where({
        status,
        usuario_id,
      });
      res.status(200).json(upToDateClient);
    }

    if (status === "Inadimplente") {
      const defaultingClient = await knex("clientes").where({
        status,
        usuario_id,
      });
      res.status(200).json(defaultingClient);
    }
  } catch (error) {
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = detailStatusClient;
