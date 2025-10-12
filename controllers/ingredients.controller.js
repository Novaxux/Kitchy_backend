import { IngredientsRepository } from "../models/IngredientsRepository.js";
import pool from "../config/db.js";

export class IngredientsController {
  /** GET /ingredients */
  static async getAll(req, res) {
    try {
      const ingredients = await IngredientsRepository.getAll(pool);
      res.json(ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** GET /ingredients/:id */
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const ingredient = await IngredientsRepository.getById(pool, id);
      if (!ingredient)
        return res.status(404).json({ error: "Ingredient not found" });
      res.json(ingredient);
    } catch (error) {
      console.error("Error fetching ingredient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** POST /ingredients */
  static async create(req, res) {
    try {
      const id = await IngredientsRepository.create(pool, req.body);
      res.status(201).json({ message: "Ingredient created", id });
    } catch (error) {
      console.error("Error creating ingredient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** PUT /ingredients/:id */
  static async update(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await IngredientsRepository.update(
        pool,
        id,
        req.body
      );
      if (affectedRows === 0)
        return res.status(404).json({ error: "Ingredient not found" });
      res.json({ message: "Ingredient updated" });
    } catch (error) {
      console.error("Error updating ingredient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** DELETE /ingredients/:id */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await IngredientsRepository.delete(pool, id);
      if (affectedRows === 0)
        return res.status(404).json({ error: "Ingredient not found" });
      res.json({ message: "Ingredient deleted" });
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
