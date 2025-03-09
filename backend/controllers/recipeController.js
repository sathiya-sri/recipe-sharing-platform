import recipeModel from "../models/recipeModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      createdBy,
      preparationTime,
      preparationProcess,
      category,
      cuisine,
      mealType,
      dietType,
      nutrition,
      ingredients,
    } = req.body;

    const user = await userModel.findById(createdBy);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let imageUrl = "";
    let videoUrl = "";

    if (req.files?.image?.[0]) {
      const imageUpload = await cloudinary.uploader.upload(
        req.files.image[0].path,
        {
          resource_type: "image",
        }
      );
      imageUrl = imageUpload.secure_url;
    }

    if (req.files?.video?.[0]) {
      const videoUpload = await cloudinary.uploader.upload(
        req.files.video[0].path,
        {
          resource_type: "video",
        }
      );
      videoUrl = videoUpload.secure_url;
    }

    const newRecipe = new recipeModel({
      title,
      description,
      createdBy,
      preparationTime,
      preparationProcess,
      category,
      cuisine,
      mealType,
      dietType,
      image: imageUrl,
      video: videoUrl,
      ingredients,
      nutrition,
    });

    await newRecipe.save();
    user.addedRecipes.push(newRecipe._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
   const recipes = await recipeModel.find().populate("createdBy", "name");


 
    return res.status(200).json({ success: true, recipes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await recipeModel
      .findById(recipeId)
      .populate("createdBy", "name profileImage");

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    return res.status(200).json({ success: true, recipe });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const deletedRecipe = await recipeModel.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    await userModel.updateOne(
      { _id: deletedRecipe.createdBy },
      { $pull: { addedRecipes: recipeId } }
    );

    return res.status(200).json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const saveRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const user = await userModel.findById(userId);
    const recipe = await recipeModel.findById(recipeId);

    if (!user || !recipe) {
      return res.status(404).json({ success: false, message: "User or Recipe not found" });
    }

    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }

    return res.json({
      success: true,
      message: "Recipe saved successfully",
    });
  } catch (error) {
    console.error("Error saving recipe:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};




// Get saved recipes of a user
export const getSavedRecipes = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId).populate("savedRecipes");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, savedRecipes: user.savedRecipes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeSavedRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const user = await userModel.findById(userId);
    const recipe = await recipeModel.findById(recipeId);

    if (!user || !recipe) {
      return res.status(404).json({ success: false, message: "User or Recipe not found" });
    }

    if (user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.pull(recipeId);
      await user.save();

      return res.json({
        success: true,
        message: "Recipe removed from saved recipes successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Recipe not found in saved recipes",
      });
    }
  } catch (error) {
    console.error("Error removing saved recipe:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addReview = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { user, reviewText, rating } = req.body;

    const review = {
      user,
      reviewText,
      rating,
      createdAt: new Date(),
    };

   console.log(review);

    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      recipeId,
      { $push: { reviews: review } },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({ success: true, message: "Review added successfully", recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await recipeModel
      .findById(recipeId)
      .select("reviews")
      .populate("reviews.user", "name");
      
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({ success: true, reviews: recipe.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};