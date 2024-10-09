import Recipe from '../models/RecipeModel.js';
import Category from '../models/CategorieModel.js';

class RecipeController {
  static async getAllRecipes(req, res) {
    try {
      const recipes = await Recipe.getAll();
      res.json(recipes);
    } catch (error) {
      console.error('Erreur dans getAllRecipes:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async getRecipeById(req, res) {
    const { id } = req.params;
    try {
      const recipe = await Recipe.getById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recette non trouvée' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Erreur dans getRecipeById:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async addRecipe(req, res) {
    const { title, type, ingredient, categorie_id } = req.body;

    try {
      const categoryExists = await Category.getById(categorie_id);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Catégorie non trouvée' });
      }

      const result = await Recipe.create({
        title,
        type,
        ingredient,
        categorie_id,
      });
      res
        .status(201)
        .json({ message: 'Recette créée avec succès', recipe: result });
    } catch (error) {
      console.error('Erreur dans addRecipe:', error);
      res.status(500).json({
        message: 'Erreur lors de la création de la recette',
        error: error.message,
      });
    }
  }

  static async updateRecipe(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      await Recipe.update(id, updatedData);
      res.status(200).json({ message: 'Recette mise à jour avec succès' });
    } catch (error) {
      console.error('Erreur dans updateRecipe:', error);
      res.status(500).json({
        message: 'Erreur lors de la mise à jour de la recette',
        error: error.message,
      });
    }
  }

  // static async deleteRecipe(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const recipe = await Recipe.getById(id);
  //     if (!recipe) {
  //       return res.status(404).json({ message: 'Recette non trouvée.' });
  //     }

  //     await Recipe.delete(id);
  //     res.status(200).json({ message: 'Recette supprimée avec succès.' });
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression de la recette:', error);
  //     res.status(500).json({ message: 'Erreur serveur' });
  //   }
  // }
  static async deleteRecipe(req, res) {
    const { id } = req.params;
    try {
      // Récupérer la recette par ID
      const recipe = await Recipe.getById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recette non trouvée.' });
      }

      // Supprimer la recette
      await Recipe.delete(id);

      // Vérifier si d'autres recettes sont liées à la même catégorie
      const otherRecipes = await Recipe.getAll();
      const remainingRecipes = otherRecipes.filter(
        (r) => r.categorie_id === recipe.categorie_id
      );

      // Si aucune autre recette n'est liée à la catégorie, supprimer la catégorie
      if (remainingRecipes.length === 0) {
        await Category.delete(recipe.categorie_id);
      }

      res
        .status(200)
        .json({ message: 'Recette et catégorie associée supprimées.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
}

export default RecipeController;
