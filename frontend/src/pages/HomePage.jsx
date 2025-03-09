import React from "react";
import NewRecipe from "../components/NewRecipe/NewRecipe.jsx";
import TrendingRecipe from "../components/TrendingRecipe/TrendingRecipe.jsx";
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import Gallery from "../components/Gallery/Gallery.jsx";


const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <NewRecipe />
      <Gallery/>
      <TrendingRecipe />
    </div>
  );
};

export default HomePage;
