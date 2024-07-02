import Signer from "haciendacostarica-signer";




export const SignatureXml = async (req, res) => {
  try {
    const { xmlString, llavecriptografica, PassLlaveCriptografica } = req.body;

    const verify = await Signer.verifySignature(llavecriptografica, PassLlaveCriptografica);

    if (!verify.isValid) {
      res.send(400).json({error:"El certificado  o contraseña no es valida"})
    }

    const xmlSigned = await Signer.sign(xmlString, llavecriptografica, PassLlaveCriptografica);
    res.status(200).json({xmlSigned:xmlSigned});

  } catch (error) {
    res.status(500).json({error:error.message});

    
  }

};
