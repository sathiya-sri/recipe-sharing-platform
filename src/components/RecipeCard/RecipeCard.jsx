import { useState } from "react";
import { PiChefHatDuotone } from "react-icons/pi";
import { AiOutlineClockCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <motion.div
      className="w-full lg:w-[250px] bg-white p-3 rounded-md shadow-md cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image Section with Hover Zoom */}
      <motion.div
        className="w-full h-[180px] overflow-hidden rounded-xl relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          className="w-full h-full object-cover"
          src="https://i.pinimg.com/474x/75/8d/90/758d90e9847fd28c624f819314b3dfb1.jpg"
          alt={recipe.title}
        />
        
        {/* Save Button (Heart Icon) */}
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={handleSave}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
        >
          {isSaved ? (
            <AiFillHeart className="text-red-500 text-xl transition-all duration-300" />
          ) : (
            <AiOutlineHeart className="text-gray-500 text-xl transition-all duration-300 hover:text-red-500" />
          )}
        </motion.button>
      </motion.div>

      {/* Text Content */}
      <div className="p-2 mt-3">
        <div className="flex flex-col">
          <h3 className="font-semibold text-base truncate w-full">
            {recipe.title}
          </h3>
          <h3 className="font-light text-xs truncate w-full mt-1">
            {recipe.description}
          </h3>
        </div>

        {/* Info Section */}
        <div className="flex justify-between mt-3">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-red-50 text-[#ff4141] transition-all rounded-full"
            >
              <AiOutlineClockCircle className="text-base" />
              {recipe.preparationTime}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center gap-1 px-2 text-[10px] bg-gray-200 rounded-3xl text-black transition-all"
            >
              <PiChefHatDuotone className="text-base" />
              <p className="mt-0.5">{recipe.createdBy}</p>
            </motion.button>
          </div>
        </div>

        {/* View More Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center mt-4"
        >
          <button className="w-full text-[#ff4141] border border-[#ff4141] px-6 py-2 text-xs hover:bg-[#ff4141] hover:text-white transition-all duration-300">
            View More
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
