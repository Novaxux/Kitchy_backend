// controllers/FavoritesController.js
import { FavoritesRepository } from "../models/FavoritesRepository.js";
import { getPoolFor } from "../lib/dbSelector.js";

export async function toggleFavorite(req, res) {
  try {
    const { recipeId } = req.params;
    // Prefer session-attached user, fallback to req.user (attachUser middleware)
    const userId = req.session.user.id;

    if (!recipeId) {
      return res.status(400).json({ message: "recipeId is required" });
    }

    const pool = await getPoolFor(req);

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
-
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
  try {
    const userId = req.session.user.id;
    const pool = await getPoolFor(req);
    const data = await FavoritesRepository.getFavoriteIds(pool, userId);
    return res.json({ favorites: data });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
