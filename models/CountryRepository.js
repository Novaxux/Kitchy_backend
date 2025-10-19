export class CountryRepository {
  /** Obtener todos los países */
  static async getAll(pool) {
    const [rows] = await pool.execute(`SELECT * FROM countries`);
    return rows;
  }

  /** Obtener país por ID */
  static async getById(pool, id) {
    const [rows] = await pool.execute(`SELECT * FROM countries WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  }

  /** Crear un nuevo país */
  static async create(pool, { name, svg_icon }) {
    const [result] = await pool.execute(
      `INSERT INTO countries (name, svg_icon) VALUES (?, ?)`,
      [name, svg_icon]
    );
    return result.insertId;
  }

  /** Actualizar país */
  static async update(pool, id, { name, svg_icon }) {
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push(`name = ?`);
      values.push(name);
    }
    if (svg_icon !== undefined) {
      fields.push(`svg_icon = ?`);
      values.push(svg_icon);
    }
    if (fields.length === 0) return 0;

    values.push(id);
    const [result] = await pool.execute(
      `UPDATE countries SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    return result.affectedRows;
  }

  /** Eliminar país */
  static async delete(pool, id) {
    const [result] = await pool.execute(`DELETE FROM countries WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows;
  }
}
