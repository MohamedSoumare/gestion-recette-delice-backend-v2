const db = require('../config/db');  


const Recipe = {
  getAll: () => {
    return db.promise().query('SELECT * FROM recipes');

  },
  getById: (id) => {
    return db.query('SELECT * FROM recipes WHERE id = ?', [id]);
  },
  create: (title, ingredients, type) => {
    return db.query('INSERT INTO recipes (title, type , description, ingredients) VALUES (?, ?, ?, ?)', [title, ingredients, type]);
  },
  update: (id, updatedData) => {
    return db.query('UPDATE recipes SET ? WHERE id = ?', [updatedData, id]);
  },
  delete: (id) => {
    return db.query('DELETE FROM recipes WHERE id = ?', [id]);
  }
  
};

module.exports = Recipe;
