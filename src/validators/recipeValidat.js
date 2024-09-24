import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/RecipeModel.js ';


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
      const existingRecipe = await Recipe.checkRecipe(value); 
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
      const result = await Recipe.getById(value); 
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

const updateRequestValidator = [
  // Vérifier que l'ID est fourni et valide
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID de la recette est requis')
    .bail()
    .custom(async (value) => {
      const recipeExists = await Recipe.getById(value);
      if (recipeExists.length === 0) {
        throw new Error('Cette recette n\'existe pas');
      }
      return true;
    }),

  // Validation des champs pouvant être mis à jour
  check('title')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Le titre doit contenir au moins 6 caractères'),
  
  check('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Le type de recette est requis'),

  check('ingredient')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Les ingrédients sont requis'),

  check('description')
    .optional()
    .not()
    .isEmpty()
    .withMessage('La description est requise'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];

const getByIdRequestValidator = [
  
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID de la recette est requis')
    .bail()
    .custom(async (value) => {
      const recipeExists = await Recipe.getById(value);
      if (recipeExists.length === 0) {
        throw new Error('Cette recette n\'existe pas');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];


export { addRequestValidator, deleteRequestValidator,getByIdRequestValidator, updateRequestValidator };