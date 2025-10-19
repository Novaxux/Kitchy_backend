import express from "express";
import { CountryController } from "../controllers/country.controller.js";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.use(attachUser);
router.use(requireAuth);

// Obtener todos los países
router.get("/", CountryController.getAll);

// Obtener un país por id
router.get("/:id", CountryController.getById);

// Operaciones de admin
router.use(requireAdmin);
router.post("/", CountryController.create);
router.put("/:id", CountryController.update);
router.delete("/:id", CountryController.delete);

export default router;