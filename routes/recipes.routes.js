import { Router } from "express";
import * as RecipeController from "../controllers/recipe.controller.js";
import { attachUser, requireAuth } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(attachUser);
router.use(requireAuth);
// Crear una nueva receta
router.post("/", requireAdmin, RecipeController.createRecipe);

// Agregar ingredientes a una receta
router.post("/:id/ingredients", requireAdmin, RecipeController.addIngredients);

// Obtener todos los ingredientes de una receta
router.get("/:id/ingredients", RecipeController.getIngredientsByRecipe);

// Obtener todas las recetas
router.get("/", RecipeController.getAllRecipes);

// Buscar recetas por nombre
router.get("/search", RecipeController.getRecipesByName);

// Obtener detalles de una receta por id
router.get("/:id/details", RecipeController.getRecipeDetailsById);

// Obtener descripcion general de una receta por id
router.get("/:id", RecipeController.getRecipeById);

// Modificar una receta (PATCH)
router.patch("/:id", requireAdmin, RecipeController.updateRecipe);

// Eliminar una receta
router.delete("/:id", requireAdmin, RecipeController.deleteRecipe);

export default router;
