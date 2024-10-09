import db from '../config/db.js';

class CategoryModel {
  static async create(name) {
    const query = 'INSERT INTO categories (name) VALUES (?)';
    const [result] = await db.query(query, [name]);
    return result;
  }

  static async getById(id) {
    const query = 'SELECT * FROM categories WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async update(id, name) {
    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    const [result] = await db.query(query, [name, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result;
  }

  static async getAll() {
    const query = 'SELECT * FROM categories';
    const [rows] = await db.query(query);
    return rows;
  }

  static async isCategoryUsed(categorie_id) {
    const query =
      'SELECT COUNT(*) as count FROM recipes WHERE categorie_id = ?';
    const [rows] = await db.query(query, [categorie_id]);
    return rows[0].count > 0;
  }
  static async checkCategoryName(nom) {
    const query = 'SELECT * FROM categories WHERE name = ?';
    const [rows] = await db.query(query, [nom]);
    return rows.length > 0 ? rows[0] : null;
  }
}

export default CategoryModel;
