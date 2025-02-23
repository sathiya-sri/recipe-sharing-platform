import { createContext, useState } from "react";
import RecipeData from "../data/RecipeData.jsx"; // Import the recipe data

// Create the context
export const RecipeContext = createContext();

// Create the provider component
export const RecipeProvider = ({ children }) => {
  
  const [recipes, setRecipes] = useState(RecipeData);

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  // Function to delete a recipe
  const deleteRecipe = (recipeTitle) => {
    setRecipes(recipes.filter(recipe => recipe.title !== recipeTitle));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
