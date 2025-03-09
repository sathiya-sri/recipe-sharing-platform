import React, { useContext, useState } from "react";  // Added useState import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import RecipeContext from "../../context/RecipeContext.jsx";

const CategorySlider = ({ CategoryData, filterType }) => {
  const { handleFilterChange } = useContext(RecipeContext);
  const [activeCategory, setActiveCategory] = useState("");  // Keep this

  // Function to handle category click
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);  // Update active category
    handleFilterChange(filterType, categoryName);  // Apply filter
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-16 p-3">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
          1536: { slidesPerView: 7 },
        }}
        className="w-full"
      >
        {CategoryData.map((category, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center p-3 justify-center rounded-sm shadow-2xl w-[150px] h-fit transition-all duration-300 hover:scale-110"
          >
            <div
              onClick={() => handleCategoryClick(category.name)}  // Updated onClick
              className={`flex flex-col items-center rounded-sm p-3 shadow-2xl w-[150px] h-fit cursor-pointer transition-colors duration-300 ${
                activeCategory === category.name
                  ? "bg-[#ff4141] text-white"    // Active styles
                  : "bg-white text-[#ff4141] hover:bg-[#ff4141] hover:text-white"  // Inactive & hover styles
              }`}
            >
              <p className="text-sm font-light text-center">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="prev-btn text-sm lg:text-lg absolute -left-8 sm:-left-12 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 lg:p-3 rounded-full shadow-md z-10 hover:bg-red-700">
        <FaChevronLeft />
      </button>
      <button className="next-btn text-sm lg:text-lg absolute -right-8 sm:-right-12 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 lg:p-3 rounded-full shadow-md z-10 hover:bg-red-700">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CategorySlider;
