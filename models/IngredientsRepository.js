export class IngredientsRepository {
  /** Obtener todos los ingredientes */
  static async getAll(pool) {
    const [rows] = await pool.execute(`SELECT * FROM ingredients`);
    return rows;
  }

  /** Obtener ingrediente por ID */
  static async getById(pool, id) {
    const [rows] = await pool.execute(
      `SELECT * FROM ingredients WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  /** Crear un nuevo ingrediente */
  static async create(pool, { name }) {
    const [result] = await pool.execute(
      `INSERT INTO ingredients (name) VALUES (?)`,
      [name]
    );
    return result.insertId;
  }

  /** Actualizar ingrediente */
  static async update(pool, id, { name }) {
    const [result] = await pool.execute(
      `UPDATE ingredients SET name = ? WHERE id = ?`,
      [name, id]
    );
    return result.affectedRows;
  }

  /** Eliminar ingrediente */
  static async delete(pool, id) {
    const [result] = await pool.execute(
      `DELETE FROM ingredients WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}
