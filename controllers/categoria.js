const { response, request } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

// obtenerCategoria - populate {}
obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  // if (!categoriaDB) {
  //   res.status(400).json({
  //     msg: `La categoría ingresada no existe.`,
  //   });
  // }

  res.json(categoria);
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre} ya existe.`,
    });
  }

  // Generar la data a guardar.
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizarCategoria - privado - Cualquiera con token válido.

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  console.log(categoria);

  res.status(200).json(categoria);
};

// borrarCategoria - estado:false

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.status(200).json(categoria);
};

module.exports = {
  CrearCategoria: crearCategoria,
  ObtenerCategorias: obtenerCategorias,
  ObtenerCategoria: obtenerCategoria,
  ActualizarCategoria: actualizarCategoria,
  BorrarCategoria: borrarCategoria,
};
