const { response, request } = require("express");
const { body } = require("express-validator");
const { Producto } = require("../models");

// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

// obtenerProducto - populate {}
obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  res.json(producto);
};

const crearProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;

  //agregué esto:
  const nombre = body.nombre.toUpperCase();

  //Cambie el findOne
  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe.`,
    });
  }

  // Generar la data a guardar.
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  // Guardar DB
  await producto.save();

  res.status(201).json(producto);
};

// actualizarProducto - privado - Cualquiera con token válido.

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  console.log(producto);

  res.status(200).json(producto);
};

// borrarProducto - estado:false

const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.status(200).json(productoBorrado);
};

module.exports = {
  CrearProducto: crearProducto,
  ObtenerProductos: obtenerProductos,
  ObtenerProducto: obtenerProducto,
  ActualizarProducto: actualizarProducto,
  BorrarProducto: borrarProducto,
};
