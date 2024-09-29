import Category from '../models/CategorieModel.js';

const getCategories = async (req, res) => {
  const categories = await Category.getAll();
  res.json(categories);
};

const addCategorie = async (req, res) => {
  const { nom } = req.body;
  const newCategorie = await Category.create(nom);
  res.status(201).json(newCategorie);
};

const updateCategorie = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const categorie = await Category.getById(id);
  
  if (categorie) {
    await Category.update(id, nom);
    res.json({ id, nom });
  } else {
    res.status(404).json({ message: 'Catégorie non trouvée' });
  }
};

const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  const categorie = await Category.getById(id);
  
  if (categorie) {
    await Category.delete(id);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Catégorie non trouvée' });
  }
};

export {
  getCategories,
  addCategorie,
  updateCategorie,
  deleteCategorie,
};
