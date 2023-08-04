import { fileURLToPath } from "url";
import path, { join } from "path";

/**
 * * Configura para la ruta base del proyecto
 */

const __file = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__file);
export const filesPath = join(__dirname, "/public/uploads");
