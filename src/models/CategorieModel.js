import db from '../config/db.js';

const Category = {
  create: async (nom) => {
    const query = 'INSERT INTO categories (name) VALUES (?)';
    const [result] = await db.query(query, [nom]);
    return result;
  },
  getAll: async () => {
    const query = 'SELECT * FROM categories';
    const [rows] = await db.query(query);
    return rows;
  },
  getById: async (id) => {
    const query = 'SELECT * FROM categories WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  },
  update: async (id, nom) => {
    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    const [result] = await db.query(query, [nom, id]);
    return result;
  },
  delete: async (id) => {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result;
  },
};

export default Category;
