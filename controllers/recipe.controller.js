import { RecipeRepository } from "../models/RecipeRepository.js";
import { getPoolFor } from "../lib/dbSelector.js";

/** POST /recipes */
export async function createRecipe(req, res) {
  const pool = await getPoolFor(req);
  try {
    const recipeId = await RecipeRepository.createRecipe(pool, req.body);
    res.status(201).json({ message: "Recipe created", recipeId });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/** POST /recipes/:id/ingredients */
export async function addIngredients(req, res) {
  const { id: recipeId } = req.params;
  const { ingredients } = req.body;
  const pool = await getPoolFor(req);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await RecipeRepository.addIngredientsToRecipe(
      connection,
      recipeId,
      ingredients
    );

    await connection.commit();
    res.json({ message: "Ingredients added successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error adding ingredients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
}

/** GET /recipes */
export async function getAllRecipes(req, res) {
  const pool = await getPoolFor(req);
  try {
    const offset = req.query.offset ? Number(req.query.offset) : 0;

    if (!Number.isInteger(offset) || offset < 0) {
      return res.status(400).json({ error: "Invalid offset value" });
    }

    const recipes = await RecipeRepository.getAllRecipes(pool, offset);
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/** GET /recipes/search?name=... */
export async function getRecipesByName(req, res) {
  const pool = await getPoolFor(req);
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Query parameter 'name' is required" });
  }

  try {
    const recipes = await RecipeRepository.getRecipesByName(pool, name);
    if (recipes.length === 0) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.json(recipes);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/** PATCH /recipes/:id */
export async function updateRecipe(req, res) {
  const { id } = req.params;
  const updates = req.body;
  const pool = await getPoolFor(req);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const result = await RecipeRepository.updateRecipe(connection, id, updates);

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "Recipe not found" });
    }

    await connection.commit();
    res.json({ message: "Recipe updated successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
}

/** DELETE /recipes/:id */
export async function deleteRecipe(req, res) {
  const { id } = req.params;
  const pool = await getPoolFor(req);

  try {
    const result = await RecipeRepository.deleteRecipe(pool, id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/** GET /recipes/:id/ingredients */
export async function getIngredientsByRecipe(req, res) {
  const { id: recipeId } = req.params;
  const pool = await getPoolFor(req);

  try {
    const ingredients = await RecipeRepository.getIngredientsByRecipeId(
      pool,
      recipeId
    );
    if (ingredients.length === 0) {
      return res
        .status(404)
        .json({ error: "No ingredients found for this recipe" });
    }
    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/** GET /recipes/:id */
export async function getRecipeById(req, res) {
  const { id } = req.params;
  const pool = await getPoolFor(req);

  try {
    const recipe = await RecipeRepository.getRecipeById(pool, id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/** GET /recipes/:id/details */
export async function getRecipeDetailsById(req, res) {
  const { id } = req.params;
  const pool = await getPoolFor(req);

  try {
    const recipe = await RecipeRepository.getRecipeById(pool, id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const ingredients = await RecipeRepository.getIngredientsByRecipeId(
      pool,
      id
    );
    res.json({ ...recipe, ingredients });
  } catch (error) {
    console.error("Error fetching recipe by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
