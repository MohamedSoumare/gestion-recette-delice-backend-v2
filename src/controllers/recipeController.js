import Recipe from '../models/RecipeModel.js ';

const recipeController = {

  async getAllRecipes(req, res) {
    try {
      const recipes = await Recipe.getAll();
      res.json(recipes);
    } catch (error) {
      console.error('Error in getAllRecipes:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Récupérer une recette par son ID
async getRecipeById(req, res) {
    const { id } = req.params;
    try {
      const recipe = await Recipe.getById(id);
    
       res.json(recipe);
      
    } catch (error) {
      console.error('Error in getRecipeById:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Ajouter une nouvelle recette
  async addRecipe(req, res) {
    const { title, type, ingredient, description } = req.body;
  
    try {
      await Recipe.create(title, type, description, ingredient);
      res.status(200).json({ message: 'Recette créée avec succès' });
    } catch (error) {
      console.error('Error in addRecipe:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la recette' });
    }
  },

async updateRecipe(req, res) {
    const { id } = req.params;
    const updatedData = req.body; 
    try {
    
       await Recipe.update(id, updatedData);
     
    } catch (error) {
      console.error('Error in updateRecipe:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
},


async deleteRecipe(req, res) {
    const { id } = req.params;
    try {
            await Recipe.delete(id);
      
    } catch (error) {
      console.error('Error in deleteRecipe:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de la recette' });
    }
  },

};

export default recipeController;
