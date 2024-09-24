import express from 'express';
import recipeController from '../controllers/RecipeController.js ';
import {
  addRequestValidator,
  deleteRequestValidator,
  getByIdRequestValidator,
  updateRequestValidator,
} from '../validators/RecipeValidat.js';

const router = express.Router();

router.get('/recipes', recipeController.getAllRecipes);
router.get(
  '/recipes/:id',
  getByIdRequestValidator,
  recipeController.getRecipeById
);
router.post('/recipes/add', addRequestValidator, recipeController.addRecipe);
router.put(
  '/recipes/edit/:id',
  updateRequestValidator,
  recipeController.updateRecipe
);
router.delete(
  '/recipes/delete/:id',
  deleteRequestValidator,
  recipeController.deleteRecipe
);

export default router;
