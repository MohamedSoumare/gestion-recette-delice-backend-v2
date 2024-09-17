const { check, param, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const Recipe = require('../models/recipeModel'); 
// Validation pour l'ajout d'une recette
const addRequestValidator = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Titre ne peut pas être vide!')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Minimum 6 caractères requis!')
    .bail()
    .custom(async (value) => {
      const existingRecipe = await Recipe.checkRecipe(value); // Appel de la méthode checkRecipe
      if (existingRecipe > 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation pour la suppression d'une recette
const deleteRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('Id est obligatoire!')
    .bail()
    .custom(async (value, { req }) => {
      const result = await Recipe.getById(value); // Correction ici : appel correct à getById
      if (result.length === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { addRequestValidator, deleteRequestValidator };
