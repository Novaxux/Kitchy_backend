export class CategoriesRepository {
  /** Obtener todas las categorías */
  static async getAll(pool) {
    const [rows] = await pool.execute(`SELECT * FROM categories`);
    return rows;
  }

  /** Obtener categoría por ID */
  static async getById(pool, id) {
    const [rows] = await pool.execute(`SELECT * FROM categories WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  }

  /** Crear una nueva categoría */
  static async create(pool, { name }) {
    const [result] = await pool.execute(
      `INSERT INTO categories (name) VALUES (?)`,
      [name]
    );
    return result.insertId;
  }

  /** Actualizar categoría */
  static async update(pool, id, { name }) {
    const [result] = await pool.execute(
      `UPDATE categories SET name = ? WHERE id = ?`,
      [name, id]
    );
    return result.affectedRows;
  }

  /** Eliminar categoría */
  static async delete(pool, id) {
    const [result] = await pool.execute(`DELETE FROM categories WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows;
  }
}
