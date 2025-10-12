export class RecipeRepository {
  /** Crea una receta y devuelve el ID insertado */
  static async createRecipe(
    pool,
    { title, description, instructions, image_url, category_id, country_id }
  ) {
    const [result] = await pool.execute(
      `INSERT INTO recipes (title, description, instructions, image_url, category_id, country_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, instructions, image_url, category_id, country_id]
    );

    return result.insertId; // ID de la receta creada
  }

  /** Inserta múltiples ingredientes en recipe_ingredients */
  static async addIngredientsToRecipe(connection, recipeId, ingredients) {
    const insertQuery = `
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id, unit_id, quantity)
            VALUES (?, ?, ?, ?)
        `;

    for (const ingredient of ingredients) {
      const { ingredient_id, unit_id, quantity } = ingredient;
      await connection.execute(insertQuery, [
        recipeId,
        ingredient_id,
        unit_id,
        quantity,
      ]);
    }
  }
  // Obtener todas las recetas
  static async getAllRecipes(pool) {
    const [rows] = await pool.query("SELECT * FROM recipes");
    return rows;
  }

  // Buscar recetas por nombre (LIKE)
  static async getRecipesByName(pool, name) {
    const [rows] = await pool.query(
      "SELECT * FROM recipes WHERE title LIKE ?",
      [`%${name}%`]
    );
    return rows;
  }

  // Modificar receta
  static async updateRecipe(pool, id, updates) {
    const fields = [];
    const values = [];

    for (const key in updates) {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    }

    if (fields.length === 0) return { affectedRows: 0 };

    const sql = `UPDATE recipes SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await pool.query(sql, values);
    return result;
  }

  // Eliminar receta
  static async deleteRecipe(pool, id) {
    const [result] = await pool.query("DELETE FROM recipes WHERE id = ?", [id]);
    return result;
  }
  // Obtener ingredientes de una receta por recipe_id con nombres de unidades
  static async getIngredientsByRecipeId(pool, recipeId) {
    const sql = `
    SELECT 
      ri.ingredient_id,
      i.name AS ingredient_name,
      ri.quantity,
      u.name AS unit_name
    FROM recipe_ingredients ri
    INNER JOIN ingredients i ON ri.ingredient_id = i.id
    LEFT JOIN units u ON ri.unit_id = u.id
    WHERE ri.recipe_id = ?
  `;

    const [rows] = await pool.query(sql, [recipeId]);
    return rows;
  }
}
