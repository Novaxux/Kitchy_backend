import express from "express";
import { IngredientsController } from "../controllers/ingredients.controller.js";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.use(attachUser);
router.use(requireAuth);
router.get("/:id", IngredientsController.getById);
router.use(requireAdmin);
router.get("/", IngredientsController.getAll);
router.post("/", IngredientsController.create);
router.put("/:id", IngredientsController.update);
router.delete("/:id", IngredientsController.delete);

export default router;
