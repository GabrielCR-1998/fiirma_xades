import express from "express";
import { router } from  './routes/getFiles.routes.js';

const app = express();
app.use(express.json());
app.use("/api/signature/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});
