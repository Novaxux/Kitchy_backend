// models/LikeRepository.js
export class LikeRepository {
  static async findLike(conn, userId, recipeId) {
    const [rows] = await conn.query(
      "SELECT liked FROM likes WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    return rows;
  }

  static async insertLike(conn, userId, recipeId) {
    await conn.query(
      "INSERT INTO likes (user_id, recipe_id, liked) VALUES (?, ?, true)",
      [userId, recipeId]
    );
  }

  static async updateLike(conn, userId, recipeId, liked) {
    await conn.query(
      "UPDATE likes SET liked = ? WHERE user_id = ? AND recipe_id = ?",
      [liked, userId, recipeId]
    );
  }

  static async countActiveLikes(conn, recipeId) {
    const [rows] = await conn.query(
      "SELECT COUNT(*) AS total FROM likes WHERE recipe_id = ? AND liked = true",
      [recipeId]
    );
    return rows[0].total;
  }
}
