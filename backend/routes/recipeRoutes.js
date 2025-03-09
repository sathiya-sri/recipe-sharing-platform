import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
  addReview,
  getAllReviews
} from "../controllers/recipeController.js";
import upload from "../middleware/multer.js";

const recipeRouter = express.Router();

recipeRouter.post("/add",upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]), createRecipe);
recipeRouter.get("/get", getAllRecipes);
recipeRouter.get("/:recipeId", getRecipeById);
recipeRouter.delete("/:recipeId", deleteRecipe);
recipeRouter.post("/:userId/save/:recipeId", saveRecipe);
recipeRouter.get("/:userId/saved", getSavedRecipes);
recipeRouter.delete("/:userId/remove-recipe/:recipeId", removeSavedRecipe);
recipeRouter.post("/:recipeId/reviews", addReview);
recipeRouter.get("/:recipeId/getReviews",getAllReviews);


export default recipeRouter;
