import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import RecipeContext from "../context/RecipeContext";
import { IoCloseOutline } from "react-icons/io5";
import RecipeReviews from "../components/RecipeReviews/RecipeReviews";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);
  const [isVideoOpen, setIsVideoOpen] = useState(false); // State for video modal

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center text-2xl text-red-500">
        Loading recipes...
      </div>
    );
  }

  const recipe = recipes.find((r) => r._id.toString() === id);

  if (!recipe) {
    return (
      <div className="text-center text-2xl text-red-500">Recipe not found!</div>
    );
  }

  return (
    <div className="p-4">
      {/* Recipe Image and Details */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <img
          src={recipe.image}
          alt={recipe.title || "Recipe Image"}
          className="rounded-md max-w-full h-auto md:w-1/3"
        />

        <div className="flex flex-col gap-2 w-full md:w-1/2 text-left">
          <h2 className="text-2xl md:text-4xl uppercase font-semibold">
            {recipe.title}
          </h2>
          <p className="text-sm mt-2 text-justify font-light">
            {recipe.description}
          </p>

          <div className="grid grid-cols-1 items-start justify-start md:grid-cols-2 md:items-center md:justify-center">
            <div className="mt-5 space-y-4">
              <p className="text-md">
                <span className="font-semibold mr-2">Preparation Time:</span>
                {recipe.preparationTime}
              </p>
              <p className="text-md">
                <span className="font-semibold mr-2">Created By:</span>
                {recipe.createdBy.name}
              </p>
              <p className="text-md">
                <span className="font-semibold mr-2">Category:</span>
                {recipe.category}
              </p>
              <p className="text-md">
                <span className="font-semibold mr-2">Cuisine:</span>
                {recipe.cuisine}
              </p>
              <p className="text-md">
                <span className="font-semibold mr-2">Meal Type:</span>
                {recipe.mealType}
              </p>
              <p className="text-md">
                <span className="font-semibold mr-2">Diet:</span>
                {recipe.dietType}
              </p>
            </div>
            {/* Nutrition Facts */}
            {/* Nutrition Facts */}
            {recipe.nutrition && (
              <div className="mt-5 space-y-4">
                <h3 className="text-xl font-medium mb-5 uppercase">
                  Nutrition Facts :
                </h3>
                <ul className="text-md space-y-5">
                  <li>
                    <strong className="font-semibold mr-2">Calories :</strong>{" "}
                    {recipe.nutrition.calories} kcal
                  </li>
                  <li>
                    <strong className="font-semibold mr-2">Protein :</strong>{" "}
                    {recipe.nutrition.protein} g
                  </li>
                  <li>
                    <strong className="font-semibold mr-2">Fat :</strong>{" "}
                    {recipe.nutrition.fat} g
                  </li>
                  <li>
                    <strong className="font-semibold mr-2">Carbs :</strong>{" "}
                    {recipe.nutrition.carbohydrates} g
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Video Link */}
          {recipe.video && (
            <button
              onClick={() => setIsVideoOpen(true)}
              className="mt-4 bg-[#ff4141] text-white px-4 py-2 rounded hover:bg-transparent border-[0.5px] border-[#ff4141] hover:text-[#ff4141]"
            >
              Watch Recipe Video
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 w-full max-w-6xl mx-auto">
        <h3 className="uppercase font-semibold text-xl tracking-wider">
          Preparation Process
        </h3>
        <p className="font-light text-sm mt-4 leading-relaxed text-justify">
          {recipe.preparationProcess}
        </p>
      </div>

      {/* Ingredients Section */}
      <div className="mt-8 w-full max-w-6xl mx-auto">
        <div className="">
          <h3 className="text-xl uppercase font-semibold tracking-wider mb-4 text-center md:text-left">
            Ingredients
          </h3>
          <ul className="list-decimal list-inside space-y-3 px-4 md:px-0">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-md font-light py-1">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RecipeReviews recipe={recipe} />

      {/* Video Popup Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 z-50">
          <div className="relative bg-white p-4 pt-6 rounded-md shadow-2xl max-w-4xl w-full transform scale-100 transition-transform duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 text-xl bg-gray-800 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition duration-200"
            >
              <IoCloseOutline />
            </button>

            {/* Video Title */}
            <h3 className="text-2xl font-semibold uppercase mb-4 text-center text-[#ff4141]">
              Recipe Video
            </h3>

            {/* Video Frame */}
            <div className="relative w-full pb-[56.25%] rounded-md overflow-hidden shadow-md">
              <video
                src={recipe.video}
                controls
                className="absolute inset-0 w-full h-full object-cover"
              ></video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
