const { check } = require("express-validator");
const {
  CrearProducto,
  ObtenerProductos,
  ObtenerProducto,
  ActualizarProducto,
  BorrarProducto,
} = require("../controllers/productos");
const { Router } = require("express");
const {
  validarCampos,
  validarJWT,
  tieneRole,
  esAdminRole,
} = require("../middlewares");
const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");

const router = Router();

// {{url}}/api/productos

// Obtener todas las productos - Público.
router.get("/", ObtenerProductos, (req, res) => {
  res.json("Get");
});

// Obtener un producto por id - publico.
router.get(
  "/:id",

  [
    check("id", "No es un id de Mongo válido.").isMongoId(),

    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  ObtenerProducto,
  (req, res) => {
    res.json("Get-Id");
  }
);

// Crear un producto - Privado - Cualquier persona con un token válido.
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  CrearProducto
);

// Actualizar - Privado - Cualquiera con token válido.
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido.").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  ActualizarProducto
);

// Borrar producto - Admin.
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un id de Mongo válido.").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  BorrarProducto
);

module.exports = router;
