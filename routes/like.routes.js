import { Router } from "express";
import { toggleLike } from "../controllers/like.controller.js";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(attachUser);
router.use(requireAuth);
// Toggle like de receta
router.patch("/:recipeId/like", toggleLike);

export default router;
