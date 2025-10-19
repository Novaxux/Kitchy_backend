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

  /** Obtener todas las recetas */
  static async getAll(pool, offset = 0, limit = 10) {
    const sql = `SELECT id, title, description, image_url, likes_count FROM recipes ORDER BY id DESC LIMIT ? OFFSET ?`;
    const [rows] = await pool.query(sql, [Number(limit), Number(offset)]);
    return rows;
  }

  /** Obtener receta por id */
  static async getById(pool, id) {
    const [rows] = await pool.query(
      `SELECT id, title, description, instructions, image_url, likes_count, category_id, country_id
       FROM recipes WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
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

  static async getFiltered(pool, filters = {}) {
    const { name, category, country } = filters;
    let sql = `
    SELECT r.id, r.title, r.description, r.image_url, r.likes_count
    FROM recipes r
    LEFT JOIN categories c ON r.category_id = c.id
    LEFT JOIN countries co ON r.country_id = co.id
    WHERE 1=1
  `;
    const params = [];

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

    sql += ` ORDER BY r.id DESC`;

    const [rows] = await pool.query(sql, params);
    return rows;
  }
}
