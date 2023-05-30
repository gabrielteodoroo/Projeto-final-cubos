const knex = require("../../services/connectionSQL");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("É obrigatório email e senha");
  }

  try {
    const users = await knex("usuarios").where({ email }).first();

    if (!users) {
      return res.status(404).json("O usuario não foi encontrado");
    }

    const { senha: userPassword, ...user } = users;

    const passwordCorrect = await bcrypt.compare(senha, userPassword);

    if (!passwordCorrect) {
      return res.status(400).json("Email e senha não confere");
    }

    const token = jwt.sign({ id: users.id }, process.env.BYCRYPT, {
      expiresIn: "24h",
    });

    const { senha: _, ...userdata } = users;

    return res.status(200).json({
      users: userdata,
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = loginUser;
