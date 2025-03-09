import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const images = [
  "https://i.pinimg.com/474x/6d/d6/ce/6dd6cec0f261d64f5180c40c600b4e35.jpg",
  "https://i.pinimg.com/474x/00/3f/0f/003f0f0351967a7cb6212a8d9bfaf889.jpg",
  "https://i.pinimg.com/474x/09/e4/ac/09e4acfe3778136b196f0202b45f49d5.jpg",
  "https://i.pinimg.com/736x/a7/bf/68/a7bf68a8976eb5a1f4294945de840850.jpg",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSelectedImage(images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setSelectedImage(images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="px-6 md:px-12 py-12 ">
      <motion.h1
        className="text-center text-black text-2xl sm:text-2xl font-medium flex items-center justify-center gap-2 my-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Food Gallery
      </motion.h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-md shadow-md cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(index)}
          >
            <motion.img
              src={src}
              alt={`Gallery item ${index + 1}`}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
              <p className="text-white text-base sm:text-xl font-semibold">
                View
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
    <motion.div
      className="relative w-[90%] max-w-[450px] h-auto flex flex-col items-center justify-center bg-white rounded-md shadow-md p-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full text-black text-base md:text-xl"
          onClick={prevImage}
        >
          <AiOutlineLeft />
        </button>
      )}

      <img
        src={selectedImage}
        alt="Expanded View"
        className="w-full h-auto max-h-[80vh] object-contain rounded-md"
      />

      {/* Next Button */}
      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full text-blacktext-base md:text-xl"
          onClick={nextImage}
        >
          <AiOutlineRight />
        </button>
      )}

      {/* Close Button */}
      <button
        className="absolute top-5 right-5 bg-white p-2 rounded-full text-black text-base md:text-xl"
        onClick={closeLightbox}
      >
        <AiOutlineClose />
      </button>
    </motion.div>
  </div>
)}


    </div>
  );
};

export default Gallery;
