// controllers/likeController.js
import { LikeRepository } from "../models/LikeRepository.js";
import { userPool as pool } from "../config/db.js";

export async function toggleLike(req, res) {
  const { recipeId } = req.params;
  // Prefer session or attached user; fallback to body for compatibility
  const userId = req.session?.user?.id || req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const existing = await LikeRepository.findLike(
      connection,
      userId,
      recipeId
    );

    let liked;
    if (existing.length === 0) {
      await LikeRepository.insertLike(connection, userId, recipeId);
      liked = true;
    } else {
      liked = !existing[0].liked;
      await LikeRepository.updateLike(connection, userId, recipeId, liked);
    }

    const totalLikes = await LikeRepository.countActiveLikes(
      connection,
      recipeId
    );

    await connection.commit();
    res.json({ liked, totalLikes });
  } catch (error) {
    await connection.rollback();
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
}
