import React, { useContext } from "react";
import { motion } from "framer-motion";
import CategorySlider from "../components/CategorySlider/CategorySlider.jsx";
import CuisineData from "../data/CuisineData.jsx";
import RecipeContext from "../context/RecipeContext.jsx";
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx";

const CuisineTypePage = () => {

   const { recipes = [] } = useContext(RecipeContext);
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

    const typingText = "Discover Global Flavors based on cuisine type";

  return (
    <div className="px-6 md:px-12 py-12 min-h-screen"  >
      <div
        className="relative w-full h-40 rounded-lg bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2018/02/05/19/12/strawberry-3132973_1280.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>{" "}
        {/* Dark Overlay */}
        {/* Typing Animation for Heading */}
        <motion.h1 className="relative text-white text-base mx-auto justify-center md:text-3xl font-medium uppercase z-10 tracking-wide flex flex-wrap p-2">
          {typingText.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariant}
              initial="hidden"
              animate="visible"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {/* Blinking Cursor */}
          <motion.span
            className="ml-1 w-[6px] h-[20px] md:h-[36px] bg-white inline-block"
            variants={cursorVariant}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          ></motion.span>
        </motion.h1>
      </div>
      <CategorySlider CategoryData={CuisineData} filterType="cuisine" />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          <p className="text-center col-span-full">No recipes found.</p>
        )}
      </motion.div>

    </div>
  );
};

export default CuisineTypePage;
