const { response, request } = require("express");
const bycriptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { Promise } = require("mongoose");

const usuarioGet = async (req = request, res = response) => {
  // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuarioPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bycriptjs.genSaltSync();
  usuario.password = bycriptjs.hashSync(password, salt);

  // Guardar en base de datos
  await usuario.save();

  res.json({
    msg: "post API - Controlador",
    usuario,
  });
};

const usuarioPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra la base de datos

  if (password) {
    // Encriptar la contraseña
    const salt = bycriptjs.genSaltSync();
    resto.password = bycriptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuarioPath = (req, res) => {
  res.json({
    msg: "patch API - Controlador",
  });
};

const usuarioDelete = async (req, res) => {
  const { id } = req.params;
  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPath,
};
