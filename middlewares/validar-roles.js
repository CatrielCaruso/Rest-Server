const { response, request } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msj: "Se quiere verificar el Role sin validar el token primero.",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msj: `${nombre} no es administrador - No puede hacer esto.`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msj: "Se quiere verificar el Role sin validar el token primero.",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msj: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
