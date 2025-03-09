import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx";
import RecipeContext from "../context/RecipeContext.jsx";
import CategorySlider from "../components/CategorySlider/CategorySlider.jsx";
import CategoryData from "../data/CategoryData.jsx";

const ExplorePage = () => {
  const { recipes = [] } = useContext(RecipeContext); // Ensure recipes is always an array
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const timeA = parseInt(a.preparationTime);
      const timeB = parseInt(b.preparationTime);
      return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });

  // Typing animation variants
  const letterVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const cursorVariant = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const typingText = "Explore Recipes";

  return (
    <div className="px-6 md:px-12 py-12 min-h-screen" >
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-40 rounded-lg bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2018/02/05/19/12/strawberry-3132973_1280.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div> {/* Dark Overlay */}
        
        {/* Typing Animation for Heading */}
        <motion.h1 className="relative text-white text-xl md:text-3xl font-bold uppercase z-10 flex">
          {typingText.split("").map((char, i) => (
            <motion.span key={i} custom={i} variants={letterVariant} initial="hidden" animate="visible">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {/* Blinking Cursor */}
          <motion.span
            className="ml-1 w-[6px] h-[30px] md:h-[40px] bg-white inline-block"
            variants={cursorVariant}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          ></motion.span>
        </motion.h1>
      </div>

      {/* Search & Sort Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 justify-center items-center my-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-sm focus:outline-none "
          />
          <FaSearch className="absolute top-5 left-4 text-gray-400" />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="w-full md:w-auto flex items-center gap-2 px-4 py-3 text-sm font-medium bg-[#ff4141] text-white rounded-sm transition hover:bg-red-500"
        >
          {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
          Sort by Time
        </button>
      </motion.div>

     <CategorySlider CategoryData={CategoryData} filterType="category"/>
      {/* Recipe Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          <p className="text-center col-span-full">No recipes found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default ExplorePage;
