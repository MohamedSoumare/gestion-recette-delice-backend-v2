// CategorieModel.js
import db from '../config/db.js';

class Category {
  static async create(nom) {
    const query = 'INSERT INTO categories (name) VALUES (?)';
    const [result] = await db.query(query, [nom]);
    return result;
  }

  static async getAll() {
    const query = 'SELECT * FROM categories';
    const [rows] = await db.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM categories WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async update(id, nom) {
    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    const [result] = await db.query(query, [nom, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result;
  }

  static async checkCategoryName(nom) {
    const query = 'SELECT * FROM categories WHERE name = ?';
    const [rows] = await db.query(query, [nom]);
    return rows.length > 0 ? rows[0] : null;
  }
}

export default Category;
