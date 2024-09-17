const Recipe = require('../models/recipeModel');  

// Contrôleur pour gérer les opérations sur les recettes
const recipeController = {
  // Récupérer toutes les recettes
  async getAllRecipes(req, res) {
    try {
      const recipes = await Recipe.getAll();
      res.json(recipes);
    } catch (error) {
      console.error('Error in getAllRecipes:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Récupérer une recette par son ID
  async getRecipeById(req, res) {
    const { id } = req.params;
    try {
      const recipe = await Recipe.getById(id);
      if (recipe.length > 0) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: 'Recette non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Ajouter une nouvelle recette
  async addRecipe(req, res) {
    const { title, type,  ingredient, description } = req.body;

    if (!title || !ingredient || !type || !description) {
      return res.status(400).json({ message: 'Données invalides : tous les champs sont obligatoires' });
    }
  
    try {
       
      await Recipe.create(title, type, description, ingredient);
      res.status(200).json({ message: 'Recette créée avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de la recette' });
    }
  },

  // Mettre à jour une recette existante
  // Mettre à jour une recette existante
async updateRecipe(req, res) {
  const { id } = req.params;
  const updatedData = req.body; // Contiendra les champs à mettre à jour
  
  try {
    const recipeExists = await Recipe.getById(id); // Vérifier si la recette existe
    if (recipeExists.length === 0) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    const result = await Recipe.update(id, updatedData); // Mise à jour de la recette
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Recette mise à jour avec succès' });
    } else {
      res.status(400).json({ message: 'Erreur lors de la mise à jour de la recette' });
    }
  } catch (error) {
    console.error('Error in updateRecipe:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
},

  // Supprimer une recette
  async deleteRecipe(req, res) {
    const { id } = req.params;
    try {
      const result = await Recipe.delete(id);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Recette supprimée avec succès' });
      } else {
        res.status(404).json({ message: 'Recette non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de la recette' });
    }
  },
};

module.exports = recipeController;
