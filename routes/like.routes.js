import { Router } from "express";
import { toggleLike } from "../controllers/like.controller.js";

const router = Router();

// Toggle like de receta
router.patch("/:recipeId/like", toggleLike);

export default router;
