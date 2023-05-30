const knex = require("../../services/connectionSQL");

const detailBillingById = async (req, res) => {
  const { id } = req.params;

  try {

    const oneBilling = await knex("cobrancas")
      .where({ id: id })
      .select(
        "id",
        "nome_cliente",
        "descricao",
        "status",
        "valor",
        "vencimento",
      )
      .returning("*")
      .first();
    
    if (oneBilling.length === 0) {
      return res.status(401).json({
        message: "Cobrança não encontrado",
      });
    }

    return res.status(200).json(oneBilling);

  } catch(error) {
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = detailBillingById;