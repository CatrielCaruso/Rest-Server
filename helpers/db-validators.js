const { Usuario, Categoria, Producto } = require("../models");
const Role = require("../models/role");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

// Verificar si el correo existe

const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado en la BD`);
  }
};
// Verificar si el id existe
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`el ID:${id} no existe`);
  }
};

// Validador de categoría.
const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`el ID:${id} no existe`);
  }
};

// Validador de producto.
const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`el ID:${id} no existe`);
  }
};
// Validar colecciones permitidas.
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La colección:${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  colecionesPermitidas: coleccionesPermitidas,
};
