const knex = require("../../services/connectionSQL");

const clients = async (req, res) => {
  try {
    const usuario_id = req.user.id;

    let allClientsResultQuery = [];
    let allClients = await knex("clientes")
      .where({ usuario_id })
      .select(
        "id",
        "nome",
        "email",
        "status",
        "cpf",
        "telefone",
        "cep",
        "logradouro",
        "complemento",
        "bairro",
        "cidade",
        "estado"
      )
      .orderBy("id", "desc")
      .returning("*");

    const findBilings = await knex("cobrancas")
      .where({ usuario_id: usuario_id })
      .select("*")
      .returning("*");

    for (const billing of findBilings) {
      if (billing.status === "vencido") {
        const updateStatus = await knex("clientes")
          .where({ id: billing.cliente_id })
          .update({ status: "Inadimplente" });

        allClientsResultQuery = await knex("clientes")
          .where({ usuario_id: usuario_id })
          .select(
            "id",
            "nome",
            "email",
            "status",
            "cpf",
            "telefone",
            "cep",
            "logradouro",
            "complemento",
            "bairro",
            "cidade",
            "estado"
          )
          .orderBy("id", "desc")
          .returning("*");
      }

      if(billing.status === "paga" || billing.status === "pendente") {
        const updateStatus = await knex("clientes")
          .where({ id: billing.cliente_id })
          .update({ status: "Em dia" });
        
        teste = await knex("clientes")
          .where({ usuario_id: usuario_id })
          .select(
            "id",
            "nome",
            "email",
            "status",
            "cpf",
            "telefone",
            "cep",
            "logradouro",
            "complemento",
            "bairro",
            "cidade",
            "estado"
          )
          .orderBy("id", "desc")
          .returning("*");
      }
    }

    if (allClients.length === 0) {
      return res.status(401).json({
        message: "Você não tem clientes cadastrados",
      });
    }

    return res.status(200).json(allClientsResultQuery.length === 0 ? allClients : allClientsResultQuery);
  } catch (error) {
    return res.status(500).json({ menssage: "Erro interno do servidor" });
  }
};

module.exports = clients;
