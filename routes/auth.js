const { check } = require("express-validator");
const { login } = require("../controllers/auth");
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

module.exports = router;
