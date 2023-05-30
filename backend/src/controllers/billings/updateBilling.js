const knex = require("../../services/connectionSQL");

const updateBilling = async (req, res) => {
  const { nome_cliente, descricao, vencimento, valor, status } = req.body;
  const { id } = req.params;

  try {

    const findBilling = await knex("cobrancas")
      .where({ id: id })
      .select("nome_cliente", "descricao", "vencimento", "valor", "status")
      .returning("*");


    const billing = {
      nome_cliente: !nome_cliente ? findBilling[0].nome_cliente : nome_cliente,
      descricao: !descricao ? findBilling[0].descricao : descricao,
      vencimento: !vencimento ? findBilling[0].vencimento : vencimento,
      valor: !valor ? findBilling[0].valor : valor,
      status: !status ? findBilling[0].status : status,
    };

    const update = await knex("cobrancas")
      .where({ id: id })
      .update(billing);

    return res.status(200).json(billing);
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = updateBilling;