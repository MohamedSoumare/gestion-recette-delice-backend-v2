import { check, param, validationResult } from 'express-validator';
import Recipe from '../models/RecipeModel.js ';
import Category from '../models/CategorieModel.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
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

  check('type').not().isEmpty().withMessage('Le type de recette est requis.'),

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
        throw new Error('Cette catégorie existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const deleteRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID est obligatoire.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];
const updateRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette existe pas.');
      }
      return true;
    }),

  check('title')
    .optional()
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
        throw new Error('Cette catégorie existe pas.');
      }
      return true;
    }),

  handleValidationErrors,
];

const getByIdRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const addCategoryValidator = [
  check('nom')
    .not()
    .isEmpty()
    .withMessage('Le nom de la catégorie ne peut pas être vide.')
    .isLength({ max: 50 })
    .withMessage('Le nom de la catégorie ne doit pas dépasser 50 caractères.')
    .custom(async (value) => {
      const existingCategory = await Category.checkCategoryName(value);
      if (existingCategory) {
        throw new Error('Une catégorie avec ce nom existe déjà.');
      }
      return true;
    }),
  handleValidationErrors,
];

const updateCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('ID de la catégorie doit être un nombre.'),
  check('nom')
    .not()
    .isEmpty()
    .withMessage('Le nom de la catégorie ne peut pas être vide.')
    .isLength({ max: 50 })
    .withMessage('Le nom de la catégorie ne doit pas dépasser 50 caractères.')
    .bail()
    .custom(async (value, { req }) => {
      const existingCategory = await Category.checkCategoryName(value);
      if (
        existingCategory &&
        existingCategory.id !== parseInt(req.params.id, 10)
      ) {
        throw new Error('Une catégorie avec ce nom existe déjà.');
      }
      return true;
    }),
  handleValidationErrors,
];

const deleteCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('ID de la catégorie doit être un nombre.')
    .bail()
    .custom(async (value) => {
      const categorie = await Category.getById(value);
      if (!categorie) {
        throw new Error('Cette catégorie existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const getByIdCategorieRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID de la catégorie est requis.')
    .bail()
    .custom(async (value) => {
      const categorie = await Category.getById(value);
      if (!categorie) {
        throw new Error('Cette catégorie existe pas.');
      }
      return true;
    }),
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
  getByIdCategorieRequestValidator,
};
