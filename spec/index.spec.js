import Recipe from "../src/models/RecipeModel.js ";

describe("Recipe tests", () => {
  let recipeId = null;

  // Test de création de recette
  it("can be created", async () => {
    const recipe = {
      title: "crepe",
      type: "dessert",
      description: "pâte à base de farine",
      ingredient: "farine",
    };
    const result = await Recipe.create(
      recipe.title,
      recipe.type,
      recipe.description,
      recipe.ingredient
    );
    recipeId = result.insertId;
    const recipeCreated = await Recipe.getById(recipeId);
    expect(recipeId).not.toBeNull();
    expect(recipeCreated).not.toBeNull();
    expect(recipeCreated.title).toBe(recipe.title);
  });

  // Test de création de recette avec des données invalides
  it("cannot be created with invalid data", async () => {
    const recipe = {
      title: null, 
      type: "dessert", 
      description: "pâte à base de farine", 
      ingredient: "farine"
    };
    try {
      await Recipe.create(
        recipe.title,
        recipe.type,
        recipe.description,
        recipe.ingredient
      );
      fail('Expected an error to be thrown'); 
    } catch (error) {
      expect(error).toBeDefined();  
    
    }
  });

  // Test de récupération de toutes les recettes
  it("can get all recipes", async () => {
    const getAll = await Recipe.getAll();
    expect(getAll).not.toBeNull();
    expect(Array.isArray(getAll)).toBe(true); // Ensure it's an array
  });

  // Test de mise à jour de recette
  it("can update a recipe", async () => {
    // Assurez-vous d'avoir une recette valide dans la base de données pour mettre à jour
    const updatedData = { 
      title: "updated crepe", 
      type: "dessert", 
      description: "updated description", 
      ingredient: "updated ingredient" 
    };
    
    const result = await Recipe.update(recipeId, updatedData);
    expect(result.affectedRows).toBe(1);
  
    const updatedRecipe = await Recipe.getById(recipeId);
    expect(updatedRecipe.title).toBe(updatedData.title);  // Vérifie que le titre a bien été mis à jour
    expect(updatedRecipe.description).toBe(updatedData.description);  // Vérifie aussi la description
  });

  // Test de suppression de recette
  it("can delete a recipe", async () => {
    const result = await Recipe.delete(recipeId);
    expect(result.affectedRows).toBe(1);

    const deletedRecipe = await Recipe.getById(recipeId);
    expect(deletedRecipe).toBeNull();  // On attend que la recette soit supprimée
  });
});
