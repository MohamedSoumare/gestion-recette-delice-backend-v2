const db = require('../config/db'); // Assurez-vous que cette configuration est correcte

const Recipe = {
  // Méthode pour obtenir toutes les recettes
  async getAll() {
    const [rows] = await db.promise().query('SELECT * FROM recipes');
    return rows;
  },

  // Méthode pour obtenir une recette par son ID
  async getById(id) {
    const [rows] = await db.promise().query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows;
  },

  // Méthode pour créer une nouvelle recette
  async create(title, type, description, ingredient) {
    try {
      const [result] = await db.promise().query(
        'INSERT INTO recipes (title, type, ingredient, description) VALUES (?, ?, ?, ?)',
        [title, type, ingredient, description]
      );
      return result;
    } catch (error) {
      console.error('Erreur SQL lors de la création:', error); // Log de l'erreur SQL
      throw error; // Relancer l'erreur pour qu'elle soit capturée dans le contrôleur
    }
  },
  

  // Méthode pour vérifier si une recette avec un titre existe déjà
async checkRecipe(title) {
  const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM recipes WHERE title = ?', [title]);
  return rows[0].count; // Retourne le nombre de recettes avec ce titre
},

  // Méthode pour mettre à jour une recette
  // Méthode pour mettre à jour une recette
async update(id, updatedData) {
  try {
    const [result] = await db.promise().query(
      'UPDATE recipes SET ? WHERE id = ?',
      [updatedData, id]
    );
    return result;
  } catch (error) {
    console.error('Erreur SQL lors de la mise à jour:', error);
    throw error; 
  }
},

  // Méthode pour supprimer une recette
  async delete(id) {
    const [result] = await db.promise().query('DELETE FROM recipes WHERE id = ?', [id]);
    return result;
  }
};

module.exports = Recipe;
