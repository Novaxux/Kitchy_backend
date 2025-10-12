// routes/favorites.routes.js
import { Router } from "express";
import * as FavoritesController from "../controllers/favorites.controller.js";

const router = Router();

router.patch("/:recipeId/favorite", FavoritesController.toggleFavorite)
router.get("/favorites", FavoritesController.getFavorites)

export default router;