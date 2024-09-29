import express from 'express';
import RecipeController from '../controllers/RecipeController.js ';

import {
  addRequestValidator,
  deleteRequestValidator,
  getByIdRequestValidator,
  updateRequestValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from '../validators/RecipeValidat.js ';

import {
  getCategories,
  addCategorie,
  updateCategorie,
  deleteCategorie,
} from '../controllers/CategoriRecipeController.js';


const router = express.Router();

router.get('/recipes', RecipeController.getAllRecipes);
router.get(
  '/recipes/:id',
  getByIdRequestValidator,
  RecipeController.getRecipeById
);
router.post('/recipes/add', addRequestValidator, RecipeController.addRecipe);

router.put(
  '/recipes/edit/:id',
  updateRequestValidator,
  RecipeController.updateRecipe
);
router.delete(
  '/recipes/delete/:id',
  deleteRequestValidator,
  RecipeController.deleteRecipe

);

router.get('/categories', getCategories);
router.post('/categories/add', addCategoryValidator, addCategorie);
router.put('/categories/edit/:id', updateCategoryValidator, updateCategorie);
router.delete('/categories/delete/:id', deleteCategoryValidator, deleteCategorie);

export default router;
