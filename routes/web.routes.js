import { Router, static as static_ } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al build del frontend (ajústala si cambia tu estructura)
const frontendPath = path.resolve(__dirname, "../frontend");

router.use(static_(frontendPath));

// para que React maneje el enrutamiento del lado del cliente
router.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
router.get("/recipes", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
router.get("/favorites", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

export default router;
