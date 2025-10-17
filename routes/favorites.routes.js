// routes/favorites.routes.js
import { Router } from "express";
import * as FavoritesController from "../controllers/favorites.controller.js";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(attachUser);
router.use(requireAuth);
router.get("/favorites", FavoritesController.getFavorites)
router.patch("/:recipeId/favorite", FavoritesController.toggleFavorite)

export default router;