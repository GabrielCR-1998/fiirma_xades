import signer from "haciendacostarica-signer";
import fs from "fs";

/**
 * * Obtiene el xml original , y el archivo .p12 con su contrasena.
 * * Firma el xml y lo retorna en base64.
 * * Descargar las dependecias
 * * npm i haciendacostarica-signer --save
 * @param {*} response
 * @returns
 */

export const SignatureXml = async (request) => {
  try {
    /**
     * * Nota:
     * * request.files[0].path => .p12
     * * request.files[1].path => .xml
     */

    // * Lee la llave criptografica con su password
    const p12 = fs.readFileSync(request.files[0].path);
    const password = request.body.password_p12;

    // * Convierte los datos leidos del .p12 en base64
    const p12Base64 = p12.toString("base64");

    // * Valida que el certificado sea valido
    const verify = await signer.verifySignature(p12Base64, password);
    if (verify.isValid) {
      // * Lee el xml subido
      const xml = fs.readFileSync(request.files[1].path, "utf-8");
      // * Firma el xml en xades-edes y lo retorna firmado en base64
      const xmlSigned = await signer.sign(xml, p12Base64, password);
      return xmlSigned;
    }
    return;
  } catch (error) {
    throw Error(error.message);
  }
};
