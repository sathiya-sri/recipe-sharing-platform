import React, { useState ,useContext , useEffect} from "react";
import { motion } from "framer-motion";
import CategoryData from "../data/CategoryData.jsx";
import CuisineData from "../data/CuisineData.jsx";
import DietData from "../data/DietData.jsx";
import MealTypeData from "../data/MealTypeData.jsx";
import { IoCloseOutline } from "react-icons/io5";
import RecipeContext from "../context/RecipeContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const AddRecipePage = () => {
  const { addRecipe } = useContext(RecipeContext);
  const { profile } = useContext(AuthContext);

  // console.log(profile);

  useEffect(() => {
    if (profile && profile._id) {
      setRecipe((prev) => ({
        ...prev,
        createdBy: profile._id,
      }));
    }
  }, [profile]);

  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    createdBy: "",
    preparationTime: "",
    preparationProcess: "",
    category: "",
    cuisine: "",
    mealType: "",
    dietType: "",
    image: null,
    video: null,
    ingredients: [],
    nutrition: {
      calories: "",
      protein: "",
      fat: "",
      carbohydrates: "",
    },
  });

  const [ingredientInput, setIngredientInput] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name ==="image" || name === "video") {
      setRecipe((prev) => ({
        ...prev,
        [name]: files?.[0] || null,
      }));
      return;

    } else if (name in recipe.nutrition) {
      setRecipe((prev) => ({
        ...prev,
        nutrition: { ...prev.nutrition, [name]: value },
      }));
    } else {
      setRecipe((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleIngredientChange = (e) => {
    setIngredientInput(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setRecipe((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }));
      setIngredientInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing !== ingredientToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log(recipe.image);

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("createdBy", recipe.createdBy);
    formData.append("preparationTime", recipe.preparationTime);
    formData.append("preparationProcess", recipe.preparationProcess);
    formData.append("category", recipe.category);
    formData.append("cuisine", recipe.cuisine);
    formData.append("mealType", recipe.mealType);
    formData.append("dietType", recipe.dietType);

    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    if (recipe.video) {
      formData.append("video", recipe.video);
    }

    recipe.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });

    formData.append("nutrition[calories]", recipe.nutrition.calories);
    formData.append("nutrition[protein]", recipe.nutrition.protein);
    formData.append("nutrition[fat]", recipe.nutrition.fat);
    formData.append("nutrition[carbohydrates]", recipe.nutrition.carbohydrates);

    // console.log("FormData contents:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(key + ": " + value);
    // }
    addRecipe(formData);
    setRecipe({
      title: "",
      description: "",
      createdBy: profile?._id || "",
      preparationTime: "",
      preparationProcess: "",
      category: "",
      cuisine: "",
      mealType: "",
      dietType: "",
      image: null,
      video: null,
      ingredients: [],
      nutrition: {
        calories: "",
        protein: "",
        fat: "",
        carbohydrates: "",
      },
    });
    setIngredientInput("");
    setStep(1);
  };

  return (
    <div className="h-full py-5 flex items-center justify-center text-sm bg-[#fce3fe] px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-6 bg-white shadow-md shadow-red-100 rounded-md mt-12"
      >
        <h1 className="text-2xl font-medium uppercase text-center my-3">
          Add Recipe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1 - Basic Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-base uppercase font-medium text-black mb-2">
                Basic Detail :
              </h3>
              <div className="flex lg:flex-row flex-col items-center gap-5 pb-5 ">
                <input
                  type="text"
                  name="title"
                  value={recipe.title}
                  placeholder="Title"
                  className="w-full p-3 placeholder:text-black font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                  onChange={handleChange}
                  
                />
                <input
                  type="text"
                  name="preparationTime"
                  value={recipe.preparationTime}
                  placeholder="Preparation Time"
                  className="w-full p-3 placeholder:text-black font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                  onChange={handleChange}
                  
                />
              </div>
             
              <textarea
                name="description"
                value={recipe.description}
                placeholder="Description"
                className="w-full p-3 placeholder:text-black font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                onChange={handleChange}
              
              />

              <textarea
                name="preparationProcess"
                value={recipe.preparationProcess}
                placeholder="Preparation Process"
                className="w-full p-3 mt-3 placeholder:text-black font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                onChange={handleChange}
               
              />

              <div>
                <h3 className="text-base uppercase font-medium text-black mb-2 mt-4">
                  Ingredients:
                </h3>
                <input
                  type="text"
                  value={ingredientInput}
                  placeholder="Enter ingredient"
                  className="w-full p-3 border-[0.5px] border-[#ff4141] rounded-sm shadow-sm mb-2 font-light outline-none placeholder:text-black"
                  onChange={handleIngredientChange}
                  onKeyDown={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="bg-[#ff4141] text-white px-4 py-2 rounded-sm mt-2 mb-2"
                >
                  Add Ingredient
                </button>

                {/* Display Selected Ingredients */}
                {recipe.ingredients.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-base uppercase font-medium text-black mb-2">
                      Selected Ingredients:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="flex items-center flex-wrap gap-1 bg-gray-200 text-black px-2 py-1 rounded-sm cursor-pointer"
                        >
                          {ingredient}{" "}
                          <IoCloseOutline
                            onClick={() => handleRemoveIngredient(ingredient)}
                            className="text-base"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2 - Additional Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >

<div className="flex lg:flex-row flex-col items-center justify-between gap-5 pb-5 w-full">
                <div className="w-full lg:w-1/2">
                  <p>Add Image</p>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    placeholder="image"
                    key={recipe.image ? recipe.image.name : ""}
                    className="w-full p-3 font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                    onChange={handleChange}
                    
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <p>Add Video</p>
                  <input
                    type="file"
                    name="video"
                    placeholder="video"
                    key={recipe.video ? recipe.video.name : ""}
                    accept="video/*"
                    className="w-full p-3 font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                    onChange={handleChange}
                  
                  />
                </div>
              </div>


              <h3 className="text-base uppercase font-medium text-black mb-2">
                Categories :
              </h3>
              <div className="flex  lg:flex-row flex-col  items-center gap-5 pb-5">
                {/* Category Dropdown */}
                <select
                  name="category"
                  value={recipe.category}
                  className="w-full p-3 border-[0.5px] border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
                 
                >
                  <option value="">Select Category</option>
                  {CategoryData.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Cuisine Dropdown */}
                <select
                  name="cuisine"
                  value={recipe.cuisine}
                  className="w-full p-3 border-[0.5px] border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
              
                >
                  <option value="">Select Cuisine</option>
                  {CuisineData.map((cuisine, index) => (
                    <option key={index} value={cuisine.name}>
                      {cuisine.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex lg:flex-row flex-col  items-center gap-5 pb-5">
                {/* Meal Type Dropdown */}
                <select
                  name="mealType"
                  value={recipe.mealType}
                  className="w-full p-3 border-[0.5px] placeholder:text-[#ff4141] font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
                
                >
                  <option value="">Select Meal Type</option>
                  {MealTypeData.map((meal, index) => (
                    <option key={index} value={meal.name}>
                      {meal.name}
                    </option>
                  ))}
                </select>

                {/* Diet Dropdown */}
                <select
                  name="dietType"
                  value={recipe.dietType}
                  className="w-full p-3 border-[0.5px] placeholder:text-[#ff4141] font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
                
                >
                  <option value="">Select Diet</option>
                  {DietData.map((diet, index) => (
                    <option key={index} value={diet.name}>
                      {diet.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nutrition Facts */}
              <h3 className="text-base uppercase font-medium text-black mb-2">
                Nutrition Facts :
              </h3>
              <div className="flex lg:flex-row flex-col  items-center gap-5 pb-5">
                <input
                  type="number"
                  name="calories"
                  value={recipe.nutrition.calories}
                  placeholder="Calories"
                  className="w-full p-3 border-[0.5px] placeholder:text-black font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
               
                />
                <input
                  type="number"
                  name="protein"
                  value={recipe.nutrition.protein}
                  placeholder="Protein (g)"
                  className="w-full p-3 border-[0.5px] placeholder:text-black font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
          
                />
              </div>
              <div className="flex lg:flex-row flex-col  items-center gap-5 pb-5">
                <input
                  type="number"
                  name="fat"
                  value={recipe.nutrition.fat}
                  placeholder="Fat (g)"
                  className="w-full p-3 border-[0.5px] placeholder:text-black font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
               
                />
                <input
                  type="number"
                  name="carbohydrates"
                  value={recipe.nutrition.carbohydrates}
                  placeholder="Carbohydrates (g)"
                  className="w-full p-3 border-[0.5px] placeholder:text-black font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
            
                />
              </div>
            </motion.div>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-center space-x-4 mt-2">
            <button
              type="button"
              className={`px-5 py-2 rounded shadow-md transition ${
                step === 1
                  ? "bg-[#ff4141] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setStep(1)}
            >
              1
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded shadow-md transition ${
                step === 2
                  ? "bg-[#ff4141] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setStep(2)}
            >
              2
            </button>
          </div>

          {/* Submit Button (Visible only on Step 2) */}
          {step === 2 && (
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full bg-[#ff4141] text-white py-2 px-6 rounded shadow-sm hover:bg-red-600 outline-none transition"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddRecipePage;
