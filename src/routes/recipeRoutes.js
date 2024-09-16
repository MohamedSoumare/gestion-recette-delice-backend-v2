const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// CRUD routes pour les recettes
router.get('/recipes', recipeController.getAllRecipes);        // GET toutes les recettes
router.get('/recipes/:id', recipeController.getRecipeById);         // GET une recette par ID
router.post('/recipes/add', recipeController.addRecipe);            // POST nouvelle recette
router.put('/recipes/edit/:id', recipeController.updateRecipe);      // PUT mise à jour d'une recette
router.delete('/recipes/delete/:id', recipeController.deleteRecipe);  // DELETE supprimer une recette

module.exports = router;
    