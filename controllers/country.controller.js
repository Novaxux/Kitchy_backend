import { CountryRepository } from "../models/CountryRepository.js";
import { getPoolFor } from "../lib/dbSelector.js";

export class CountryController {
  /** GET /countries */
  static async getAll(req, res) {
    try {
      const pool = await getPoolFor(req);
      const countries = await CountryRepository.getAll(pool);
      res.json(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** GET /countries/:id */
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const pool = await getPoolFor(req);
      const country = await CountryRepository.getById(pool, id);
      if (!country) return res.status(404).json({ error: "Country not found" });
      res.json(country);
    } catch (error) {
      console.error("Error fetching country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** POST /countries */
  static async create(req, res) {
    try {
      const pool = await getPoolFor(req);
      const id = await CountryRepository.create(pool, req.body);
      res.status(201).json({ message: "Country created", id });
    } catch (error) {
      console.error("Error creating country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** PUT /countries/:id */
  static async update(req, res) {
    const { id } = req.params;
    try {
      const pool = await getPoolFor(req);
      const affectedRows = await CountryRepository.update(pool, id, req.body);
      if (affectedRows === 0)
        return res.status(404).json({ error: "Country not found" });
      res.json({ message: "Country updated" });
    } catch (error) {
      console.error("Error updating country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /** DELETE /countries/:id */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const pool = await getPoolFor(req);
      const affectedRows = await CountryRepository.delete(pool, id);
      if (affectedRows === 0)
        return res.status(404).json({ error: "Country not found" });
      res.json({ message: "Country deleted" });
    } catch (error) {
      console.error("Error deleting country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
