import Category from '../models/CategorieModel.js';

class CategoryRecipeController {
  static async getCategories(req, res) {
    try {
      const categories = await Category.getAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des catégories.' });
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.getById(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: 'Catégorie non trouvée.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie.' });
    }
  }

  static async addCategorie(req, res) {
    const { nom } = req.body;
    try {
      const newCategorie = await Category.create(nom);
      res.status(201).json({
        message: 'Catégorie ajoutée avec succès.',
        id: newCategorie.insertId,
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout de la catégorie.' });
    }
  }

  static async updateCategorie(req, res) {
    const { id } = req.params;
    const { nom } = req.body;
    try {
      const categorie = await Category.getById(id);
      if (categorie) {
        await Category.update(id, nom);
        res.json({ message: 'Catégorie modifiée avec succès.', id, nom });
      } else {
        res.status(404).json({ message: 'Catégorie non trouvée.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la modification de la catégorie.' });
    }
  }

  static async deleteCategorie(req, res) {
    const { id } = req.params;
    try {
      // Vérifie si la catégorie est utilisée par des recettes
      const isCategoryUsed = await Category.isCategoryUsed(id);
      if (isCategoryUsed) {
        return res.status(400).json({
          message: 'Impossible de supprimer cette catégorie car elle est associée à des recettes.',
        });
      }
  
      // Si la catégorie n'est pas utilisée, on peut la supprimer
      await Category.delete(id);
      res.status(200).json({ message: 'Catégorie supprimée avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
}  

export default CategoryRecipeController;
