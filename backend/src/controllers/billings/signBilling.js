const knex = require('../../services/connectionSQL');

const signBiling = async (req, res) => {
    const { nome_cliente, descricao, status, valor, vencimento } = req.body;
    const usuario_id = req.user.id;
    const {cliente_id} = req.params;
    
    try {
        const billingRegistration = {
            nome_cliente,
            usuario_id,
            cliente_id,
            descricao,
            status,
            valor,
            vencimento
        }
        
        const billing = await knex('cobrancas').insert(billingRegistration);

        if (billing.rowCount === 0) {
            return res.status(400).json({ mensagem: "Cobrança não cadastrada" });
        }

        return res.status(200).json({ mensagem: "Cobrança cadastrada com sucesso" });
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

module.exports = signBiling;