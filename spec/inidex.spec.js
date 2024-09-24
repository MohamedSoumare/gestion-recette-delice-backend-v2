import Recipe from "../src/model/Recipe.js";

describe("Recipe tests", () => {
  let recipeId = null;

  it("can be create", async () => {
    const recipe = { titre: "crepe", type: "dessert", ingredient: "farime" };
    const result = await Recipe.createRecipe(
      recipe.titre,
      recipe.type,
      recipe.ingredient
    );
    recipeId = result.insertId;
    const recipeCreated = await Recipe.getRecipeById(recipeId);
    expect(recipeId).not.toBeNull();
    expect(recipeCreated).not.toBeNull();
  });

  it("can not be create", async () => {
    try {
      const recipe = { titre: null, type: "dessert", ingredient: "farime" };
      const result = await Recipe.createRecipe(
        recipe.titre,
        recipe.type,
        recipe.ingredient
      );
      recipeId = result.insertId;
      const recipeCreated = await Recipe.getRecipeById(recipeId);
      expect(recipeId).toBeNull();
      expect(recipeCreated).toEqual([]);
    } catch (error) {}
  });

    it("Can get all recipes", async () => {
        const getAll = await Recipe.getAllRecipes();
      expect(getAll).not.toBeNull();
    });


    // it("Can get all recipes", async () => {
    //     const getAll = await Recipe.getAllRecipes();
    //   expect(getAll).not.toBeNull();
    // });

  //   it("adds 1 + 2 to equal 3", () => {
  //     const recipe = { id: 1, title: "test" };
  //     const result = { id: 1, title: "test" };
  //     expect(recipe).toEqual(result);
  //   });
});
