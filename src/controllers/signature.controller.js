import multer from "multer";
import { filesPath } from "../config.js";
import { join } from "path";
import { upload } from "../libs/storage.js"
import { SignatureXml } from "../libs/signatureXML.js";
import { moveFiles } from "../libs/configSaved.js";

/**
 * * Ejecuta la función que se encarga de firmar el xml y lo
 * * retorna en base64 en un json
 * * Mueve los archivos subidos a una carpeta con el nombre de
 * * la clave.
 * * Borra la carpeta con los archivos, ya que no hacen falta
 * * en esta aplicción.
 * @param {*} request
 * @param {*} response
 */

export const SignatureXML = (request, response) => {
  upload(request, response, async (error) => {
    try {
      if (error instanceof multer.MulterError) {
        return response.status(500).json({ error: error.message });
      } else if (error) {
        return response.status(400).json({ error: error.message });
      }

      // * Ruta que se va a crear en la clave
      const destinationPath = join(filesPath, request.body.clave);
      // * Las rutas por defecto de los documentos(configuración de multer).
      let paths = [request.files[0].path, request.files[1].path];

      // * Xml firmado
      const data = await SignatureXml(request);

      // * mueve los archivos y luego los borra con la
      // * carpta creada.
      await moveFiles(paths, destinationPath);

      return response.status(200).json({ success: data });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  });
};
