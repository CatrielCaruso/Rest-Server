const { check } = require("express-validator");
const {
  CrearCategoria,
  ObtenerCategorias,
  ObtenerCategoria,
  ActualizarCategoria,
  BorrarCategoria,
} = require("../controllers/categoria");
const { Router } = require("express");
const {
  validarCampos,
  validarJWT,
  tieneRole,
  esAdminRole,
} = require("../middlewares");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - Público.
router.get("/", ObtenerCategorias, (req, res) => {
  res.json("Get");
});

// Obtener una categoría por id - publico.
router.get(
  "/:id",

  [
    check("id", "No es un id de Mongo válido.").isMongoId(),

    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  ObtenerCategoria,
  (req, res) => {
    res.json("Get-Id");
  }
);

// Crear una categoría - Privado - Cualquier persona con un token válido.
router.post(
  "/",
  [
    validarJWT,

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  CrearCategoria
);

// Actualizar - Privado - Cualquiera con token válido.
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido.").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  ActualizarCategoria
);

// Borrar categoría - Admin.
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un id de Mongo válido.").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  BorrarCategoria
);

module.exports = router;
