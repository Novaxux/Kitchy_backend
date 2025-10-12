// controllers/FavoritesController.js
import { FavoritesRepository } from "../models/FavoritesRepository.js";
import pool from "../config/db.js";

export async function toggleFavorite(req, res) {
  try {
    const { recipeId } = req.params;
    const { userId } = req.body;

    if (!userId || !recipeId) {
      return res
        .status(400)
        .json({ message: "userId and recipeId are required" });
    }

    // Revisar si ya existe
    const existing = await FavoritesRepository.getFavorite(
      pool,
      userId,
      recipeId
    );

    let saved;
    if (!existing) {
      // Si no existe, insertar como guardado
      await FavoritesRepository.insertFavorite(pool, userId, recipeId);
      saved = true;
    } else {
      // Si existe, invertir el estado saved
      saved = !existing.saved;
      await FavoritesRepository.updateFavorite(pool, userId, recipeId, saved);
    }

    res.json({
      message: saved
        ? "Recipe added to favorites"
        : "Recipe removed from favorites",
      saved,
    });
  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getFavorites(req, res) {
  // const userId = req.user?.id;

  // if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { userId } = req.body; // Temporalmente, hasta tener autenticación
    const data = await FavoritesRepository.getFavoriteIds(pool, userId);

    return res.json({ favorites: data });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
