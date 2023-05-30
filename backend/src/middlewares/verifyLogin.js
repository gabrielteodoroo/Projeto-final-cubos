const knex = require("../services/connectionSQL");
const jwt = require("jsonwebtoken");

const verifylogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não autorizado");
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.BYCRYPT);

    const userEncontrado = await knex("usuarios").where({ id }).first();

    if (!userEncontrado) {
      return res.status(404).json("Usuario não encontrado");
    }

    const { password, ...userdata } = userEncontrado;

    req.user = userdata;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = verifylogin;
