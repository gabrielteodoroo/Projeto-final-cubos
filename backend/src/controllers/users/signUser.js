const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');

const signUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    
    try {
        const encryptedPassword = await bcrypt.hash(senha.toString(), 10);

        const userRegistration = {
            nome,
            email,
            senha: encryptedPassword
        }
        
        const user = await knex('usuarios').insert(userRegistration);

        if (user.rowCount === 0) {
            return res.status(400).json({ mensagem: "Usuário não cadastrado" });
        }

        return res.status(200).json({ mensagem: "Cadastro realizado com sucesso" });
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

module.exports = signUser;