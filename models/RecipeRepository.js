export class RecipeRepository {
  /** Crear una nueva receta */
  static async create(
    pool,
    { title, description, instructions, image_url, category_id, country_id }
  ) {
    const [result] = await pool.execute(
      `INSERT INTO recipes (title, description, instructions, image_url, category_id, country_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, instructions, image_url, category_id, country_id]
    );
    return result.insertId;
  }

  /** Obtener todas las recetas con estado de favorito y like del usuario */
  static async getAll(pool, userId, offset = 0, limit = 10) {
    const sql = `
      SELECT 
        r.id, 
        r.title, 
        r.description, 
        r.image_url, 
        r.likes_count,
        COALESCE(f.saved, 0) AS saved,
        COALESCE(l.liked, 0) AS liked
      FROM recipes r
      LEFT JOIN favorites f ON r.id = f.recipe_id AND f.user_id = ?
      LEFT JOIN likes l ON r.id = l.recipe_id AND l.user_id = ?
      ORDER BY r.id DESC
      LIMIT ? OFFSET ?
    `;
    const [rows] = await pool.query(sql, [
      userId,
      userId,
      Number(limit),
      Number(offset),
    ]);
    return rows;
  }

  /** Obtener receta por id (con ingredientes opcionales) */
  static async getById(pool, id, userId = null) {
    let sql = `
      SELECT r.id, r.title, r.description, r.instructions, r.image_url, r.likes_count
      FROM recipes r
      WHERE r.id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) return null;

    const recipe = rows[0];

    // Si se pasa userId, traer también saved/liked
    if (userId) {
      const [[fav]] = await pool.query(
        `SELECT saved FROM favorites WHERE user_id = ? AND recipe_id = ?`,
        [userId, id]
      );
      const [[like]] = await pool.query(
        `SELECT liked FROM likes WHERE user_id = ? AND recipe_id = ?`,
        [userId, id]
      );
      recipe.saved = fav ? fav.saved : 0;
      recipe.liked = like ? like.liked : 0;
    }

    return recipe;
  }

  /** Actualizar receta */
  static async update(pool, id, updates) {
    const fields = [];
    const values = [];
    for (const key in updates) {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    }
    if (!fields.length) return { affectedRows: 0 };
    values.push(id);
    const [result] = await pool.query(
      `UPDATE recipes SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    return result;
  }

  /** Eliminar receta */
  static async delete(pool, id) {
    const [result] = await pool.query("DELETE FROM recipes WHERE id = ?", [id]);
    return result;
  }

  /** Obtener ingredientes de una receta */
  static async getIngredients(pool, recipeId) {
    const [rows] = await pool.query(
      `SELECT i.name AS ingredient_name, ri.quantity, u.name AS unit_name
       FROM recipe_ingredients ri
       JOIN ingredients i ON ri.ingredient_id = i.id
       LEFT JOIN units u ON ri.unit_id = u.id
       WHERE ri.recipe_id = ?`,
      [recipeId]
    );
    return rows;
  }

  /** Obtener recetas filtradas por nombre, categoría o país con estado de like/favorite */
  static async getFiltered(pool, userId, filters = {}, offset = 0, limit = 10) {
    const { name, category, country } = filters;
    let sql = `
      SELECT 
        r.id, 
        r.title, 
        r.description, 
        r.image_url, 
        r.likes_count,
        COALESCE(f.saved, 0) AS saved,
        COALESCE(l.liked, 0) AS liked
      FROM recipes r
      LEFT JOIN categories c ON r.category_id = c.id
      LEFT JOIN countries co ON r.country_id = co.id
      LEFT JOIN favorites f ON r.id = f.recipe_id AND f.user_id = ?
      LEFT JOIN likes l ON r.id = l.recipe_id AND l.user_id = ?
      WHERE 1=1
    `;
    const params = [userId, userId];

    if (name) {
      sql += ` AND r.title LIKE ?`;
      params.push(`%${name}%`);
    }
    if (category) {
      sql += ` AND c.name LIKE ?`;
      params.push(`%${category}%`);
    }
    if (country) {
      sql += ` AND co.name LIKE ?`;
      params.push(`%${country}%`);
    }

    sql += ` ORDER BY r.id DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.query(sql, params);
    return rows;
  }
}
