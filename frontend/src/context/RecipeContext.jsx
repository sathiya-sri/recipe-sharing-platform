import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";

const API_URL = "http://localhost:5000/api";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const { profile } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    mealType: "",
    cuisine: "",
    dietType: "",
  });

  const location = useLocation();

  // Fetch Saved Recipes
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const userId = profile?._id;
      if (userId) {
        try {
          const response = await axios.get(
            `${API_URL}/users/${userId}/saved-recipes`
          );
          const saved = Array.isArray(response.data.savedRecipes)
            ? response.data.savedRecipes
            : [];
          setSavedRecipes(saved);
        } catch (error) {
          console.error(error);
          toast.error("Error fetching saved recipes.");
        }
      } else {
        setSavedRecipes([]);
      }
    };

    fetchSavedRecipes();
  }, [profile]);

  // Fetch All Recipes
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes/get`);
      if (response.data.success) {
        setRecipes(response.data.recipes);
        //  console.log(response.data.recipes);
        setFilteredRecipes(response.data.recipes);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to fetch recipes.");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      toast.error("Error fetching recipes.");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const isRecipeSaved = (recipeId) =>
    savedRecipes.some((id) => String(id) === String(recipeId));

  // Reset Filters on Path Change
  useEffect(() => {
    setFilters({
      category: "",
      mealType: "",
      cuisine: "",
      dietType: "",
    });
  }, [location.pathname]);

  // Handle Filter Change
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  // Filter Recipes based on Filters
  useEffect(() => {
    let filtered = recipes.filter((recipe) => {
      return (
        (!filters.category || recipe.category === filters.category) &&
        (!filters.mealType || recipe.mealType === filters.mealType) &&
        (!filters.cuisine || recipe.cuisine === filters.cuisine) &&
        (!filters.dietType || recipe.dietType === filters.dietType)
      );
    });
    setFilteredRecipes(filtered);
  }, [filters, recipes]);

  // Add New Recipe
  const addRecipe = async (newRecipe) => {
    try {
      const response = await axios.post(`${API_URL}/recipes/add`, newRecipe);
      if (response.data.success) {
        setRecipes((prev) => [...prev, response.data.recipe]);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to add recipe.");
      }
    } catch (err) {
      console.error("Failed to add recipe:", err);
      toast.error("Failed to add recipe.");
    }
  };

  const saveRecipe = async (recipeId) => {
    const userId = profile?._id;
    if (!userId) {
      toast.error("You must be logged in to save recipes.");
    }
    try {
      const response = await axios.post(
        `${API_URL}/recipes/${userId}/save/${recipeId}`
      );
      if (response.data.success) {
        setSavedRecipes((prev) => [...prev, recipeId]);
        toast.success("Recipe saved successfully!");
      } else {
        handleError(null, "Failed to save recipe.");
      }
    } catch (err) {
      handleError(err, "Failed to save recipe.");
    }
  };

  const removeSavedRecipe = async (recipeId) => {
    const userId = profile?._id;
    if (!userId) {
      toast.error("You must be logged in to remove saved recipes.");
    }
    try {
      const response = await axios.delete(
        `${API_URL}/users/${userId}/remove-recipe/${recipeId}`
      );
      if (response.data.success) {
        setSavedRecipes((prev) => prev.filter((id) => id !== recipeId));
        toast.error(response.data.message);
      } else {
        handleError(null, response.data.message || "Failed to remove recipe.");
      }
    } catch (err) {
      handleError(err, "Failed to remove recipe.");
    }
  };

  // Delete Recipe by Title
  const deleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(`${API_URL}/recipes/${recipeId}`);
      if (response.data.success) {
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
        toast.success("Recipe deleted successfully!");
      } else {
        toast.error("Failed to delete recipe.");
      }
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      toast.error("Failed to delete recipe.");
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: filteredRecipes,
        addRecipe,
        deleteRecipe,
        handleFilterChange,
        saveRecipe,
        isRecipeSaved,
        removeSavedRecipe,
        savedRecipes,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
