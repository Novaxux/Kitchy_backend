import { Router } from "express";
import * as RecipeController from "../controllers/recipe.controller.js";

const router = Router();

// Crear una nueva receta
router.post("/", RecipeController.createRecipe);

// Agregar ingredientes a una receta
router.post("/:id/ingredients", RecipeController.addIngredients);

// Obtener todos los ingredientes de una receta
router.get("/:id/ingredients", RecipeController.getIngredientsByRecipe);

// Obtener todas las recetas
router.get("/", RecipeController.getAllRecipes);

// Buscar recetas por nombre
router.get("/search", RecipeController.getRecipesByName);

// Obtener una receta por id
router.get("/:id", RecipeController.getRecipeById);

// Modificar una receta (PATCH)
router.patch("/:id", RecipeController.updateRecipe);

// Eliminar una receta
router.delete("/:id", RecipeController.deleteRecipe);

export default router;
