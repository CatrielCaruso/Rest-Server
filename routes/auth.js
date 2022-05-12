const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [check("correo", "El correo es obligatorio").isEmail(), validarCampos],
  [
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",

  [check("id_token", "id_token es necesario.").not().isEmpty(), validarCampos],
  googleSignIn
);

module.exports = router;
