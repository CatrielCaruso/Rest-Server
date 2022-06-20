const { v4: uuidv4 } = require("uuid");
const path = require("path");

const subirArchivo = (
  files,
  extensionesValidas = ["jpg", "png", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    // Validar extensión.
    if (!archivo) {
      return reject("Falta el body con la propiedad archivo.");
    }
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar extensión.
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extesión: ${extension} no es válida - ${extensionesValidas}.`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = { subirArchivo };
