const { response, request } = require("express");

const usuarioGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - Controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuarioPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: "post API - Controlador",
    nombre,
    edad,
  });
};

const usuarioPut = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: "put API - Controlador",
    id,
  });
};

const usuarioPath = (req, res) => {
  res.json({
    msg: "patch API - Controlador",
  });
};

const usuarioDelete = (req, res) => {
  res.json({
    msg: "delete API - Controlador",
  });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPath,
};
