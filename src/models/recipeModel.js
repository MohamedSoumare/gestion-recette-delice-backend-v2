const db = require('../config/db'); // Assurez-vous que votre db est configuré correctement

const Recipe = {
  // Méthode pour obtenir toutes les recettes
  async getAll() {
    const [rows] = await db.promise().query('SELECT * FROM recipes');
    return rows; // Retourne toutes les recettes sous forme de tableau d'objets
  },

  // Méthode pour obtenir une recette par son ID
  async getById(id) {
    const [rows] = await db.promise().query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows; // Retourne la recette trouvée sous forme de tableau d'objets
  },

  // Méthode pour créer une nouvelle recette
  async create(title, type, description, ingredients) {
    const [result] = await db.promise().query(
      'INSERT INTO recipes (title, type, description, ingredients) VALUES (?, ?, ?, ?)',
      [title, type, description, ingredients]
    );
    return result; // Retourne le résultat de l'insertion
  },

  // Méthode pour mettre à jour une recette
  async update(id, updatedData) {
    const [result] = await db.promise().query('UPDATE recipes SET ? WHERE id = ?', [updatedData, id]);
    return result; // Retourne le résultat de la mise à jour
  },

  // Méthode pour supprimer une recette
  async delete(id) {
    const [result] = await db.promise().query('DELETE FROM recipes WHERE id = ?', [id]);
    return result; // Retourne le résultat de la suppression
  }
};

module.exports = Recipe;
