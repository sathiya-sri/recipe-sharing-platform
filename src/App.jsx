import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import AddRecipePage from "./pages/AddRecipePage.jsx";
import MealTypePage from "./pages/MealTypePage.jsx";
import CuisineTypePage from "./pages/CuisineTypePage.jsx";
import DietTypePage from "./pages/DietTypePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/categories/meal-type" element={<MealTypePage />} />
        <Route path="/categories/cuisine-type" element={<CuisineTypePage />} />
        <Route path="/categories/diet-type" element={<DietTypePage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
