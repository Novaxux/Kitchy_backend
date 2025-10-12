import { Router } from "express";
import { toggleLike } from "../controllers/like.controller.js";

const router = Router();

// Toggle like de receta
router.post("/:recipeId/like", toggleLike);

export default router;
