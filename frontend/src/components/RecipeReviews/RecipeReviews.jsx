import React, { useState, useContext, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // Import framer-motion

const RecipeReviews = ({ recipe }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState(recipe.reviews || []);
  const { profile } = useContext(AuthContext);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      const recipeId = recipe._id;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/${recipeId}/getReviews`
        );
        if (response.data.success) {
          setReviews(response.data.reviews);
        } else {
          toast.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };

    fetchReviews();
  }, [recipe._id]);

  const renderStars = (rating, onClick) => (
    <div className="flex gap-0.5 mt-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => onClick && onClick(index + 1)}
          className="cursor-pointer"
          aria-label={`Rate ${index + 1} star`}
        >
          {index < rating ? (
            <AiFillStar className="text-[#ff4141]" size={18} />
          ) : (
            <AiOutlineStar className="text-[#ff4141]" size={18} />
          )}
        </span>
      ))}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    const reviewData = {
      reviewText,
      rating,
      user: profile ? profile._id : "Anonymous",
    };

    const recipeId = recipe._id;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/recipes/${recipeId}/reviews`,
        reviewData
      );
      if (response.data.success) {
        setReviewText("");
        setRating(0);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-2 md:mt-0 mt-5 md:p-10 mx-auto">
      <div className="flex space-x-5 mb-5">
        <button
          className={`px-5 md:px-8 py-2 ${activeTab === "reviews" ? "bg-[#ff4141] text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
        <button
          className={`px-5 md:px-8 py-2 ${activeTab === "write" ? "bg-[#ff4141] text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("write")}
        >
          Write a Review
        </button>
      </div>

      {activeTab === "reviews" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review, index) => (
                <motion.li
                  key={index}
                  className="bg-white p-4 shadow-md rounded-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <strong className="text-black font-semibold">{review.user.name}:</strong>
                  <p className="text-sm text-justify mt-1">{review.reviewText}</p>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-black text-sm">({review.rating}/5)</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-black text-xl">No reviews yet.</p>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="border border-gray-300 rounded-md p-4 mt-6 shadow-md bg-white"
        >
          <h3 className="text-xl font-medium uppercase mb-2">Write a Review</h3>
          <textarea
            className="border-2 p-2 w-full mb-3 text-sm outline-none"
            rows="3"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            aria-label="Write your review"
          ></textarea>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-black">Rating:</span>
            {renderStars(rating, setRating)}
          </div>
          <button
            className="bg-[#ff4141] text-white px-8 py-2 rounded-sm hover:bg-red-700"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RecipeReviews;
