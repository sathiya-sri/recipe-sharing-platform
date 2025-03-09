import React, { useContext } from "react";
import RecipeContext from "../context/RecipeContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";

const AddedRecipesPage = () => {
  const { recipes, deleteRecipe } = useContext(RecipeContext);
  const { profile } = useContext(AuthContext);

  const addedRecipes = recipes?.filter(
    (recipe) => recipe.createdBy?._id !== profile._id
  );

  const handleDelete = (recipeId) => {
    deleteRecipe(recipeId);
  };

  return (
    <div className="min-h-screen bg-[#fce3fe] py-10 px-5">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-xl font-medium uppercase text-center mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Added Recipes
        </motion.h2>

        {profile && (
          <motion.div
            className="flex items-center mb-6 bg-white px-10 py-3 rounded-md shadow-md w-fit"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={profile.profileImage}
              alt="User"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-base font-medium uppercase">
                {profile.name}
              </h3>
              <p className="text-base font-light">{profile.email}</p>
            </div>
          </motion.div>
        )}

        {addedRecipes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {addedRecipes.map((recipe) => (
              <motion.div
                key={recipe._id}
                className="relative bg-white w-[250px] h-fit rounded shadow-md overflow-hidden transition-shadow duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onDoubleClick={() => handleDelete(recipe._id)}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="object-fill"
                />
                <motion.div
                  className="absolute inset-0 bg-red-500 bg-opacity-20 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition-opacity duration-300 flex items-center justify-center"
                  initial={{ y: 50 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="text-white text-base uppercase font-semibold tracking-wider text-center px-4">
                    {recipe.title}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No recipes added yet.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default AddedRecipesPage;
