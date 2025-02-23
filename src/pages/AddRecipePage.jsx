import React, { useState } from "react";
import { motion } from "framer-motion";
import CategoryData from "../data/CategoryData.jsx";
import CuisineData from "../data/CuisineData.jsx";
import DietData from "../data/DietData.jsx";
import MealTypeData from "../data/MealTypeData.jsx";

const AddRecipePage = () => {
  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    preparationTime: "",
    category: "",
    cuisine: "",
    mealType: "",
    diet: "",
    nutrition: {
      calories: "",
      protein: "",
      fat: "",
      carbohydrates: "",
    },
    image: null, // For storing image file
    video: null, // For storing video file
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => {
      if (name in prev.nutrition) {
        return { ...prev, nutrition: { ...prev.nutrition, [name]: value } };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Added:", recipe);
  };

  return (
    <div className="h-full py-5 flex items-center justify-center text-base bg-[#fce3fe] px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-6 bg-white shadow-md shadow-red-100 rounded-md mt-12"
      >
        <h1 className="text-2xl font-medium uppercase text-center mb-6">
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
                  required
                />
                <input
                  type="text"
                  name="preparationTime"
                  value={recipe.preparationTime}
                  placeholder="Preparation Time"
                  className="w-full p-3 placeholder:text-black font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex lg:flex-row flex-col items-center gap-5 pb-5">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  placeholder="image"
                  className="w-full p-3 font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                  onChange={handleChange}
                  required
                />
                <input
                  type="file"
                  name="video"
                  placeholder="video"
                  accept="video/*"
                  className="w-full p-3 font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="description"
                value={recipe.description}
                placeholder="Description"
                className="w-full p-3 placeholder:text-black font-light outline-none border-[0.5px] border-[#ff4141] rounded-sm shadow-sm"
                onChange={handleChange}
                required
              />
            </motion.div>
          )}

          {/* Step 2 - Additional Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
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
                  required
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
                  required
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
                  required
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
                  name="diet"
                  value={recipe.diet}
                  className="w-full p-3 border-[0.5px] placeholder:text-[#ff4141] font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
                  required
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
                  required
                />
                <input
                  type="number"
                  name="protein"
                  value={recipe.nutrition.protein}
                  placeholder="Protein (g)"
                  className="w-full p-3 border-[0.5px] placeholder:text-black font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
                  required
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
                  required
                />
                <input
                  type="number"
                  name="carbohydrates"
                  value={recipe.nutrition.carbohydrates}
                  placeholder="Carbohydrates (g)"
                  className="w-full p-3 border-[0.5px] placeholder:text-black font-light border-[#ff4141]  rounded-sm outline-none shadow-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
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
