const knex = require("../../services/connectionSQL");

const detailBilling = async (req, res) => {
  const { cliente_id } = req.params;

  try {
    let billingsResultQuery = [];
    let oneBilling = await knex("cobrancas")
      .where({ cliente_id })
      .select(
        "id",
        "nome_cliente",
        "descricao",
        "status",
        "valor",
        "vencimento"
      )
      .returning("*");

    const actualDate = new Date();

    for (const billing of oneBilling) {
      if (billing.status === "pendente" && billing.vencimento < actualDate) {
        const updateStatus = await knex("cobrancas")
          .where({ id: billing.id })
          .update({ status: "vencido" });

        teste = await knex("cobrancas")
          .where({ cliente_id })
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
    return res.status(200).json(billingsResultQuery.length === 0 ? oneBilling : billingsResultQuery);
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = detailBilling;
