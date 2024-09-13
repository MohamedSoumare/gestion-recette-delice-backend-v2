const db = require('../config/db');

// Récupérer toutes les recettes
exports.getAllRecipes = (req, res) => {
  const query = 'SELECT * FROM recipes';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Récupérer une recette par ID
exports.getRecipeById = (req, res) => {
  const query = 'SELECT * FROM recipes WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Recette non trouvée');
    res.json(results[0]);
  });
};

// Ajouter une nouvelle recette
exports.addRecipe = (req, res) => {
  const { title, ingredients, type } = req.body;
  const query = 'INSERT INTO recipes (title, ingredients, type) VALUES (?, ?, ?)';
  db.query(query, [title, ingredients, type], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Recette ajoutée avec succès');
  });
};

// Mettre à jour une recette
exports.updateRecipe = (req, res) => {
  const { title, ingredients, type } = req.body;
  const query = 'UPDATE recipes SET title = ?, ingredients = ?, type = ? WHERE id = ?';
  db.query(query, [title, ingredients, type, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Recette mise à jour avec succès');
  });
};

// Supprimer une recette
exports.deleteRecipe = (req, res) => {
  const query = 'DELETE FROM recipes WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Recette supprimée avec succès');
  });
};
