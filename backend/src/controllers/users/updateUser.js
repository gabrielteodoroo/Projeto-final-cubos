const knex = require("../../services/connectionSQL");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const { nome, email, senha, cpf, telefone } = req.body;
    const id = req.user.id;

    const findEmail = await knex("usuarios").where({ email });
    const infoUser = await knex("usuarios")
      .where({ id })
      .select("id", "nome", "email", "cpf", "telefone", "senha")
      .first();

    if (findEmail.length > 0 && infoUser.email !== findEmail[0].email) {
      return res.status(400).json({
        message:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const findCpf = await knex("usuarios").where({ cpf });
    if (findCpf.length > 0 && infoUser.cpf !== findCpf[0].cpf) {
      return res.status(400).json({
        message: "O CPF informado já está sendo utilizado",
      });
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    const user = {
      nome,
      email,
      senha: !senha ? infoUser.senha : encryptedPassword,
      cpf: !cpf ? infoUser.cpf : cpf,
      telefone: !telefone ? infoUser.telefone : telefone,
    };
    const update = await knex("usuarios")
      .where({ id: req.user.id })
      .update(user);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = updateUser;
