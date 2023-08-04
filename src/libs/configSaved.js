import fs from "fs";
import path from "path";

/**
 * * Crea una carpeta con el numero de clave
 * * del documento
 * * Mueve los documentos subidos
 * * de la ruta defiinida en la configuración de
 * * multer a esta nueva carpeta.
 * * Borra la carpeta creada con los documentos, ya
 * * * que no hacen falta guardarlos dentro de la aplicación
 * @param {*} files
 * @param {*} destinationPath
 */

export const moveFiles = async (files, destinationPath) => {
  try {
    // * Si no existe la carpeta destino la crea
    if (!fs.existsSync(destinationPath)) {
      await fs.promises.mkdir(destinationPath);
    }
    for (const filePath of files) {
      if (fs.existsSync(filePath)) {
        // * Obtiene el nombre del archivo subido
        const fileName = path.basename(filePath);
        // * Combina la nueva ruta con el nombre del archivo
        const destination = path.join(destinationPath, fileName);

        // * Mueve los archivos a la carpeta con el nombre de la clave
        await fs.promises.rename(filePath, destination);
      }
    }
    await fs.promises.rm(destinationPath, { recursive: true, force: true });
  } catch (error) {
    throw Error(`Hubo un error en la operación: ${error}`);
  }
};
