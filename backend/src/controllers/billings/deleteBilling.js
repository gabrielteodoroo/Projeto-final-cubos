const { date } = require("joi");
const knex = require("../../services/connectionSQL");

const deleteBilling = async (req, res) => {
    try {
        const id_usuario = req.user.id;
        const { id_cobranca } = req.params;
        const actualDate = new Date();

        const searchBilling = await knex('cobrancas')
            .where({ usuario_id: id_usuario, id: id_cobranca })
            .first();
        
        if (!searchBilling) {
            return res.status(401).json({ message: 'cobrança não encontrada', });
        }

        if(searchBilling.status === 'vencido') {
            return res.status(401).json({ message: 'A cobrança não pode ser excluida porque está vencida'})
        }

        if (searchBilling.status === 'paga') {
            return res.status(401).json({ message: 'A cobrança não pode ser excluida porque ja foi paga', });
        }

        if (searchBilling.vencimento >= actualDate && searchBilling.status === 'pendente') {
    
            const billingDeleted = await knex('cobrancas').
                where({ id: id_cobranca, usuario_id: id_usuario }).del()
    
            if (!billingDeleted) {
                return res.status(401).json({
                    message:
                        'cobrança não foi excluida',
                });
            }
        }

        return res.status(200).json({ mensage: "Cobrança excluida com sucesso" });

    } catch(error) {
        
        return res.status(500).json({ menssage: "Erro interno do servidor" });
    }
};

module.exports = deleteBilling;