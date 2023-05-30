const knex = require("../../services/connectionSQL");

const billings = async (req, res) => {
  const usuario_id = req.user.id;

  try {
    let allBillingsResultQuery = [];
    let allBillings = await knex("cobrancas")
      .where({ usuario_id })
      .select(
        "id",
        "nome_cliente",
        "descricao",
        "status",
        "valor",
        "vencimento"
      )
      .orderBy("id", "desc")
      .returning("*");

    const actualDate = new Date();

    for (const billing of allBillings) {
      if (billing.status === "pendente" && billing.vencimento < actualDate) {
        const updateStatus = await knex("cobrancas")
          .where({ id: billing.id })
          .update({ status: "vencido" });

        allBillingsResultQuery = await knex("cobrancas")
          .where({ usuario_id })
          .select(
            "id",
            "nome_cliente",
            "descricao",
            "status",
            "valor",
            "vencimento"
          )
          .orderBy("id", "desc")
          .returning("*");
      }
    }

    if (allBillings.length === 0) {
      return res.status(401).json({
        message: "Você não tem cobranças cadastradas",
      });
    }

    return res.status(200).json(allBillingsResultQuery.length === 0 ? allBillings : allBillingsResultQuery);
  } catch (error) {
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = billings;
