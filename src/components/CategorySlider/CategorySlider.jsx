import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons
import "swiper/css";
import "swiper/css/navigation";

const CategorySlider = ({ CategoryData }) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto my-16 ">
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
          320: { slidesPerView: 2 }, // Small screens
          480: { slidesPerView: 3 }, // Mobile devices
          768: { slidesPerView: 4 }, // Tablets
          1024: { slidesPerView: 5 }, // Small laptops
          1280: { slidesPerView: 6 }, // Large screens
          1536: { slidesPerView: 7 }, // Extra large screens
        }}
        className="w-full"
      >
        {CategoryData.map((category) => (
          <SwiperSlide
            key={category.id}
            className="flex items-center justify-center mx-auto w-24 h-32 rounded-md relative overflow-hidden p-2 shadow-2xl transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer"
          >
            <div className="flex flex-col items-center shadow-2xl p-2">
              {/* Centered Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 object-cover"
              />

              {/* Category Name */}
              <p className="mt-3 text-sm font-semibold text-[#ff4141] text-center">
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="prev-btn text-sm lg:text-lg absolute -left-6 sm:-left-10 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 lg:p-3 rounded-full shadow-md z-10 ">
        <FaChevronLeft  />
      </button>
      <button className="next-btn text-sm lg:text-lg absolute -right-6 sm:-right-10 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 lg:p-3 rounded-full shadow-md z-10">
        <FaChevronRight  />
      </button>
    </div>
  );
};

export default CategorySlider;
