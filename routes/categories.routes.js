import express from "express";
import { CategoriesController } from "../controllers/categories.controller.js";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Middleware que adjunta el usuario y requiere autenticación
router.use(attachUser);
router.use(requireAuth);

// Rutas abiertas para cualquier usuario autenticado
router.get("/:id", CategoriesController.getById);
router.get("/", CategoriesController.getAll);

// Rutas restringidas a admins
router.use(requireAdmin);
router.post("/", CategoriesController.create);
router.put("/:id", CategoriesController.update);
router.delete("/:id", CategoriesController.delete);

export default router;
