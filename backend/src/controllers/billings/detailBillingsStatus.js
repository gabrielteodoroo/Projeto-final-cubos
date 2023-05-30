const knex = require("../../services/connectionSQL");

const detailBillingStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const usuario_id = req.user.id;

    if (status === "paga") {
      const cobrancaPaga = await knex("cobrancas").where({
        status,
        usuario_id,
      });
      res.status(200).json(cobrancaPaga);
    }

    if (status === "vencido") {
      const cobrancaVencida = await knex("cobrancas").where({
        status,
        usuario_id,
      });
      res.status(200).json(cobrancaVencida);
    }

    if (status === "pendente") {
      const cobrancaPendente = await knex("cobrancas").where({
        status,
        usuario_id,
      });
      res.status(200).json(cobrancaPendente);
    }
  } catch (error) {
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = detailBillingStatus;
