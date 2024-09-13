const db = require('../config/db');

// Récupérer toutes les recettes
exports.getAllRecipes = (callback) => {
  const query = 'SELECT * FROM recipes';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Récupérer une recette par son ID
exports.getRecipeById = (id, callback) => {
  const query = 'SELECT * FROM recipes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]);
  });
};

// Ajouter une nouvelle recette
exports.addRecipe = (recipeData, callback) => {
  const { title, ingredients, type } = recipeData;
  const query = 'INSERT INTO recipes (title, ingredients, type) VALUES (?, ?, ?)';
  db.query(query, [title, ingredients, type], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Mettre à jour une recette
exports.updateRecipe = (id, recipeData, callback) => {
  const { title, ingredients, type } = recipeData;
  const query = 'UPDATE recipes SET title = ?, ingredients = ?, type = ? WHERE id = ?';
  db.query(query, [title, ingredients, type, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};


exports.deleteRecipe = (id, callback) => {
  const query = 'DELETE FROM recipes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
