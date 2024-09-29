import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/RecipeModel.js ';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }
  next();
};
const addRequestValidator = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Le titre ne peut pas être vide.')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Le titre doit comporter au moins 6 caractères.')
    .bail()
    .custom(async (value) => {
      const existingRecipe = await Recipe.checkRecipe(value);
      if (existingRecipe) {
        throw new Error('Cette recette existe déjà.');
      }
      return true;
    }),
  
  check('type')
    .not()
    .isEmpty()
    .withMessage('Le type de recette est requis.'),

  check('ingredient')
    .not()
    .isEmpty()
    .withMessage('Les ingrédients sont requis.'),

  check('categorie_id')
    .not()
    .isEmpty()
    .withMessage('La catégorie ne peut pas être vide.')
    .bail()
    .isNumeric()
    .withMessage('La catégorie doit être un ID numérique.')
    .bail()
    .custom(async (value) => {
      const existingCategory = await Recipe.checkCategory(value);
      if (!existingCategory) {
        throw new Error('Cette catégorie n\'existe pas.');
      }
      return true;
    }),

  handleValidationErrors,
];

const deleteRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID est obligatoire.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];
const updateRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),

  check('title')
    .optional() // Le titre est facultatif, car il peut ne pas être modifié
    .not()
    .isEmpty()
    .withMessage('Le titre ne peut pas être vide.')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Le titre doit comporter au moins 6 caractères.')
    .bail()
    .custom(async (value, { req }) => {
      const existingRecipe = await Recipe.checkRecipe(value);
      if (existingRecipe && value !== req.body.title) {
        throw new Error('Cette recette existe déjà.');
      }
      return true;
    }),

  check('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Le type de recette est requis.'),

  check('ingredient')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Les ingrédients sont requis.'),

  check('categorie_id')
    .optional()
    .not()
    .isEmpty()
    .withMessage('La catégorie ne peut pas être vide.')
    .bail()
    .isNumeric()
    .withMessage('La catégorie doit être un ID numérique.')
    .bail()
    .custom(async (value) => {
      const existingCategory = await Recipe.checkCategory(value);
      if (!existingCategory) {
        throw new Error('Cette catégorie n\'existe pas.');
      }
      return true;
    }),

  handleValidationErrors,
];

const getByIdRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

// Validator for adding a category
const addCategoryValidator = [
  check('nom')
    .not()
    .isEmpty()
    .withMessage('Le nom de la catégorie ne peut pas être vide.')
    .isLength({ max: 50 })
    .withMessage('Le nom de la catégorie ne doit pas dépasser 50 caractères.'),
  handleValidationErrors,
];

// Validator for updating a category
const updateCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('L\'ID de la catégorie doit être un nombre.'),
  check('nom')
    .not()
    .isEmpty()
    .withMessage('Le nom de la catégorie ne peut pas être vide.')
    .isLength({ max: 50 })
    .withMessage('Le nom de la catégorie ne doit pas dépasser 50 caractères.'),
  handleValidationErrors,
];

// Validator for deleting a category
const deleteCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('L\'ID de la catégorie doit être un nombre.'),
  handleValidationErrors,
];

export {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
  getByIdRequestValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};