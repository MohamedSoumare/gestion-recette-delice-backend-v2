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

  
  static async checkCategoryName(nom) {
    const query = 'SELECT * FROM categories WHERE name = ?';
    const [rows] = await db.query(query, [nom]);
    return rows.length > 0 ? rows[0] : null;
  }
  
  // Vérifier si la catégorie est utilisée par des recettes
  static async isCategoryUsed(id) {
    const query = 'SELECT COUNT(*) as count FROM recipes WHERE categorie_id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0].count > 0; 
  }

  static async deleteCategory(categoryId) {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [result] = await db.query(query, [categoryId]);
    return result;
  }
  
  
}

export default Category;
