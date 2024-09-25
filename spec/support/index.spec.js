import Recipe from '../../src/models/RecipeModel.js ';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be created', async () => {
    const recipe = {
      titre: 'crepe',
      type: 'dessert',
      description: 'pâte à base de farine',
      ingredient: 'farine',
    };
    const result = await Recipe.create(
      recipe.titre,
      recipe.type,
      recipe.description,
      recipe.ingredient
    );
    recipeId = result.insertId;
    const recipeCreated = await Recipe.getById(recipeId);
    expect(recipeId).not.toBeNull();
    expect(recipeCreated).not.toBeNull();
    expect(recipeCreated.title).toBe(recipe.titre); 
  });

  it('cannot be created with invalid data', async () => {
    await expect(async () => {
      const recipe = {
        titre: null,
        type: 'dessert',
        description: 'test',
        ingredient: 'farine',
      };
      await Recipe.create(
        recipe.titre,
        recipe.type,
        recipe.description,
        recipe.ingredient
      );
    }).rejects.toThrow(); 
  });

  it('can get all recipes', async () => {
    const getAll = await Recipe.getAll();
    expect(getAll).not.toBeNull();
  });

  it('can update a recipe', async () => {
    const updatedData = {
      titre: 'updated crepe',
      type: 'dessert',
      description: 'updated description',
      ingredient: 'updated ingredient',
    };
    const result = await Recipe.update(recipeId, updatedData);
    expect(result.affectedRows).toBe(1);

    const updatedRecipe = await Recipe.getById(recipeId);
    expect(updatedRecipe.title).toBe(updatedData.titre);
  });

  it('can delete a recipe', async () => {
    const result = await Recipe.delete(recipeId);
    expect(result.affectedRows).toBe(1);

    const deletedRecipe = await Recipe.getById(recipeId);
    expect(deletedRecipe).toEqual([]); 
  });
});
