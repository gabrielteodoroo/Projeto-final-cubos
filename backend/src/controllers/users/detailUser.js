const knex = require("../../services/connectionSQL");

const detailUser = async (req, res) => {
  try {
    const id = req.user.id;

    const infoUser = await knex("usuarios")
      .where({ id })
      .select("nome", "email", "cpf", "telefone");

    if (infoUser.length === 0) {
      return res.status(401).json({
        message:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    return res.status(200).json(infoUser[0]);
  } catch (error) {
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = detailUser;
