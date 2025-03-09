import React, { useContext } from "react";
import RecipeContext from "../../context/RecipeContext.jsx";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";

const TrendingRecipe = () => {

  const { recipes } = useContext(RecipeContext);

  return (
    <div className="h-fit flex flex-col justify-center items-center px-5">
      <h1 className="font-medium text-center text-black text-2xl mt-20 mb-8">
      Trending Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
        {recipes.map((recipe) => (
         <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default TrendingRecipe;
