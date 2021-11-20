const { Router } = require("express");

const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPath,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuarioGet);

router.post("/", usuarioPost);

router.put("/:id", usuarioPut);

router.delete("/", usuarioDelete);

router.patch("/", usuarioPath);

module.exports = router;
