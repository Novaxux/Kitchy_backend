import { CategoriesRepository } from "../models/CategoriesRepository.js";
import { getPoolFor } from "../lib/dbSelector.js";

export class CategoriesController {
  /** GET /categories */
  static async getAll(req, res) {
    try {
      const pool = await getPoolFor(req);
      const categories = await CategoriesRepository.getAll(pool);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** GET /categories/:id */
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const pool = await getPoolFor(req);
      const category = await CategoriesRepository.getById(pool, id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** POST /categories */
  static async create(req, res) {
    try {
      const pool = await getPoolFor(req);
      const id = await CategoriesRepository.create(pool, req.body);
      res.status(201).json({ message: "Category created", id });
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** PUT /categories/:id */
  static async update(req, res) {
    const { id } = req.params;
    try {
      const pool = await getPoolFor(req);
      const affectedRows = await CategoriesRepository.update(
        pool,
        id,
        req.body
      );
      if (affectedRows === 0)
        return res.status(404).json({ error: "Category not found" });
      res.json({ message: "Category updated" });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** DELETE /categories/:id */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const pool = await getPoolFor(req);
      const affectedRows = await CategoriesRepository.delete(pool, id);
      if (affectedRows === 0)
        return res.status(404).json({ error: "Category not found" });
      res.json({ message: "Category deleted" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
