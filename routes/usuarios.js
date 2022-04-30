const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPath,
} = require("../controllers/usuarios");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const router = Router();

router.get("/", usuarioGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("password", "La contraseña debe tener más de 6 letras.").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido.").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol válido.").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuarioPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido")
      .isMongoId()
      .bail()
      .custom(existeUsuarioPorId)
      .bail(),
    check("rol").custom(esRolValido),

    validarCampos,
  ],
  usuarioPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido")
      .isMongoId()
      .bail()
      .custom(existeUsuarioPorId)
      .bail(),

    validarCampos,
  ],
  usuarioDelete
);

router.patch("/", usuarioPath);

module.exports = router;
