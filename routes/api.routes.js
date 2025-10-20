// Rutas
import authRoutes from "./auth.routes.js";
import recipesRoutes from "./recipes.routes.js";
import ingredientsRoutes from "./ingredients.routes.js";
import categoriesRoutes from ".//categories.routes.js";
import countryRoutes from "./country.routes.js";
import favoritesRoutes from "./favorites.routes.js";
import likeRoutes from "./like.routes.js";

import { Router } from "express";
const router = Router();

// --- Rutas ---
router.use("/auth", authRoutes);
router.use("/recipes", likeRoutes);
router.use("/recipes", favoritesRoutes);
router.use("/recipes", recipesRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/countries", countryRoutes);

export default router;