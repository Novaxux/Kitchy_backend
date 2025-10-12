export class FavoritesRepository {
  static async getFavoriteIds(pool, userId) {
    const [rows] = await pool.query(
      `SELECT recipe_id FROM favorites WHERE user_id = ? AND saved = TRUE`,
      [userId]
    );
    return rows.map((r) => r.recipe_id);
  }
  static async getFavorite(pool, userId, recipeId) {
    const [rows] = await pool.query(
      `SELECT saved FROM favorites WHERE user_id = ? AND recipe_id = ?`,
      [userId, recipeId]
    );
    return rows[0] || null;
  }

  static async insertFavorite(pool, userId, recipeId) {
    await pool.query(
      `INSERT INTO favorites (user_id, recipe_id, saved) VALUES (?, ?, TRUE)`,
      [userId, recipeId]
    );
    return true;
  }

  static async updateFavorite(pool, userId, recipeId, saved) {
    await pool.query(
      `UPDATE favorites SET saved = ? WHERE user_id = ? AND recipe_id = ?`,
      [saved, userId, recipeId]
    );
    return saved;
  }
}
