import React from "react";
import { motion } from "framer-motion";
import { GiKnifeFork, GiChefToque } from "react-icons/gi";
import { FaShareAlt } from "react-icons/fa";

// Variants for letter-by-letter typing effect
const letterVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, ease: "easeOut" },
  }),
};

// Blinking cursor effect
const cursorVariant = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const HeroSection = () => {
  const typingText = "Explore New Tastes & Share Your Passion";

  return (
    <div className="relative w-full min-h-fit py-5 flex items-center justify-center px-4 sm:px-8 md:px-12">
      {/* Background Image Container */}
      <div className="relative w-full md:max-w-7xl h-[500px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex justify-center items-center overflow-hidden">
  <motion.img
    src="https://cdn.pixabay.com/photo/2020/05/11/21/57/bake-5160388_1280.jpg"
    alt="Cooking Ingredients"
    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
    transition={{ duration: 2, ease: "easeOut" }}
  />



        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>

        {/* Text Content */}
        <motion.div className="absolute text-center text-white px-6 sm:px-12 md:px-20">
          {/* Typing Animation */}
          <motion.h1 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide flex flex-wrap justify-center">
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
              className="ml-1 w-[6px] sm:w-[8px] md:w-[10px] h-[20px] sm:h-[30px] md:h-[40px] bg-white inline-block"
              variants={cursorVariant}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            ></motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-sm sm:text-base md:text-lg font-light w-full sm:w-[80%] mx-auto mt-3 sm:mt-4 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Discover mouth-watering recipes, connect with fellow food lovers, and
            turn every meal into a masterpiece!
          </motion.p>

          {/* Buttons */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ff4141] text-white px-5 py-2 sm:px-6 sm:py-3 text-sm font-medium rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              <GiKnifeFork className="text-lg sm:text-xl" /> Browse Recipes
            </motion.button>

            <motion.button
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-[#ff4141] text-white px-5 py-2 sm:px-6 sm:py-3 text-sm font-medium rounded-full shadow-md transition-transform duration-300 hover:bg-[#ff4141] hover:text-white hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              <FaShareAlt className="text-lg sm:text-xl" /> Share Your Recipe
            </motion.button>
          </div>

          {/* Community Text */}
          <motion.p
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <GiChefToque className="text-lg sm:text-2xl text-yellow-300 animate-pulse" />
            Join our passionate food community and create magic in the kitchen!
            <GiChefToque className="text-lg sm:text-2xl text-yellow-300 animate-pulse" />
          </motion.p>
        </motion.div>
      </div>
      
    </div>
  );
};

export default HeroSection;
