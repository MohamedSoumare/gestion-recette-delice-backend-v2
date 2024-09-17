const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { addRequestValidator, deleteRequestValidator } = require('../validators/recipeValidat');

// CRUD routes pour les recettes avec validation
router.get('/recipes', recipeController.getAllRecipes);        // GET toutes les recettes
router.get('/recipes/:id', deleteRequestValidator, recipeController.getRecipeById);    // GET une recette par ID avec validation
router.post('/recipes/add', addRequestValidator, recipeController.addRecipe);       // POST pour ajouter une nouvelle recette avec validation
router.put('/recipes/edit/:id', deleteRequestValidator, recipeController.updateRecipe);  // PUT pour mettre à jour une recette avec validation
router.delete('/recipes/:id', deleteRequestValidator, recipeController.deleteRecipe);// DELETE pour supprimer une recette avec validation

module.exports = router;
