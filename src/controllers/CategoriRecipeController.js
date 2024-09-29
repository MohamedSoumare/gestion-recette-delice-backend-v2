import Category from '../models/CategorieModel.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des catégories.' });
  }
};

const addCategorie = async (req, res) => {
  const { nom } = req.body;
  try {
    const newCategorie = await Category.create(nom);
    res.status(201).json({
      message: 'Catégorie ajoutée avec succès.',
      id: newCategorie.insertId,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la catégorie.' });
  }
};

const updateCategorie = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const categorie = await Category.getById(id);
    if (categorie) {
      await Category.update(id, nom);
      res.json({ message: 'Catégorie modifiée avec succès.', id, nom });
    }
  } catch (error) {
    console.error('Erreur lors de la modification de la catégorie:', error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la modification de la catégorie.' });
  }
};

const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  try {
    const categorie = await Category.getById(id);
    if (categorie) {
      await Category.delete(id);
      res.status(201).json({ message: 'Catégorie supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Catégorie non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la suppression de la catégorie.' });
  }
};

export { getCategories, addCategorie, updateCategorie, deleteCategorie };
