import multer from "multer";
import { extname } from "path";
import { filesPath } from "../config.js";
/**
 * * Configuración para multer
 * * Guarda los archivos en la carpeta public/uploads
 * * Valida que solo sean extensiones .p12 y xml
 */

const storage = multer.diskStorage({
  destination: filesPath,
  filename: (request, file, cb) => {
    return cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 7000000 },
  fileFilter: (request, file, cb) => {
    const filesTypes = [".p12", ".xml"];
    const _extname = filesTypes.includes(extname(file.originalname));
    if (_extname) {
      return cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Error en la extension del archivo"));
    }
  },
}).array("files");
