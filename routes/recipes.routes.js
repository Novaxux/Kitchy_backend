import { Router } from "express";
import * as RecipeController from "../controllers/recipe.controller.js";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(attachUser);
router.use(requireAuth);

// CRUD de recetas (admin)
router.post("/", requireAdmin, RecipeController.createRecipe);
router.post("/:id/ingredients", requireAdmin, RecipeController.addIngredients);
router.patch("/:id", requireAdmin, RecipeController.updateRecipe);
router.delete("/:id", requireAdmin, RecipeController.deleteRecipe);

// Consultas abiertas
router.get("/", RecipeController.getAllRecipes);
router.get("/search", RecipeController.getFilteredRecipes);
router.get("/:id", RecipeController.getRecipeById);
router.get("/:id/details", RecipeController.getRecipeDetailsById);
router.get("/:id/ingredients", RecipeController.getIngredientsByRecipe);

export default router;
