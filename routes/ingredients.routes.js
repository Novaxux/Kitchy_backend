import express from "express";
import { IngredientsController } from "../controllers/ingredients.controller.js";

const router = express.Router();

router.get("/", IngredientsController.getAll);
router.get("/:id", IngredientsController.getById);
router.post("/", IngredientsController.create);
router.put("/:id", IngredientsController.update);
router.delete("/:id", IngredientsController.delete);

export default router;
