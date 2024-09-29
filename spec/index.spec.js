import Recipe from '../src/models/RecipeModel.js ';

describe('Recipe tests', () => {
  let recipeId = null;
  let categorie_id = 1; // Défini ici pour éviter l'erreur

  it('can be created', async () => {
    const recipe = {
      title: 'crepe',
      type: 'dessert',
      ingredient: 'farine',
      categorie_id,
    };
    const result = await Recipe.create(
      recipe.title,
      recipe.type,
      recipe.ingredient,
      recipe.categorie_id,
    );
    recipeId = result.insertId;
    const recipeCreated = await Recipe.getById(recipeId); 
    expect(recipeId).not.toBeNull();
    expect(recipeCreated).not.toBeNull();
    expect(recipeCreated.title).toBe(recipe.title);
  });

  it('cannot be created with invalid data', async () => {
    const recipe = {
      title: null,
      type: 'dessert',
      ingredient: 'farine',
      categorie_id, 
    };
    try {
      await Recipe.create(
        recipe.title,
        recipe.type,
        recipe.ingredient,
        recipe.categorie_id,
      );
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('can get all recipes', async () => {
    const getAll = await Recipe.getAll();
    expect(getAll).not.toBeNull();
    expect(Array.isArray(getAll)).toBe(true); 
  });

  // it('can update a recipe', async () => {
  //   const updatedData = {
  //     title: 'updated crepe',
  //     type: 'dessert',
  //     ingredient: 'updated ingredient',
  //     categorie_id: categorie_id, 
  //   };

  //   const result = await Recipe.update(recipeId, updatedData);
  //   expect(result.affectedRows).toBe(1);

  //   const updatedRecipe = await Recipe.getById(recipeId);
  //   expect(updatedRecipe.title).toBe(updatedData.title); 
  // });

  it('can update a recipe including category', async () => {
    const updatedData = {
      title: 'Crêpe mise à jour',
      type: 'Dessert',
      ingredient: 'Ingrédients mis à jour',
      categorie_id: categorie_id,
    };
    const result = await Recipe.update(recipeId, updatedData);
    expect(result.affectedRows).toBe(1);

    const updatedRecipe = await Recipe.getById(recipeId);
    expect(updatedRecipe.title).toBe(updatedData.title);
    expect(updatedRecipe.categorie_id).toBe(updatedData.categorie_id);
  });

  it('can delete a recipe', async () => {
    const result = await Recipe.delete(recipeId);
    expect(result.affectedRows).toBe(1);

    const deletedRecipe = await Recipe.getById(recipeId);
    expect(deletedRecipe).toBeNull(); 
  });
  

});

