import React, { useState, useContext } from "react";
import { GiCook } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { MdClose } from "react-icons/md";

const Navbar = () => {

  const [dropdownState, setDropdownState] = useState({
    isDropdownOpen: false,
    isProfileOpen: false,
    isMobileMenuOpen: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { profile, logout } = useContext(AuthContext);
  const isProfileActive = location.pathname === "/profile";

  const categories = [
    { name: "Meal Type", path: "/categories/meal-type" },
    { name: "Cuisine Type", path: "/categories/cuisine-type" },
    { name: "Diet Type", path: "/categories/diet-type" },
  ];

  const toggleDropdown = (key) =>
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <nav className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 md:px-10 py-6">
        {/* Logo */}
        <div
          className="flex items-center gap-1 text-base font-light uppercase cursor-pointer"
          onClick={() => navigate("/")}
        >
          <GiCook className="text-lg text-[#ff4141]" />
          Recipe <span className="text-[#ff4141] font-semibold">Master</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-[#ff4141] transition-transform transform hover:scale-110"
          onClick={() => toggleDropdown("isMobileMenuOpen")}
        >
          <FiMenu />
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-xs uppercase items-center">
          <li
            className={`cursor-pointer hover:text-[#ff4141] transition-colors duration-300 ${
              location.pathname === "/" ? "text-[#ff4141]" : ""
            }`}
            onClick={() => navigate("/")}
          >
            Home
          </li>

          {/* Dropdown */}
          <li className="relative cursor-pointer">
            <span
              className="flex items-center hover:text-[#ff4141]"
              onClick={() => {
                toggleDropdown("isDropdownOpen");
              }}
            >
              Categories
              <MdArrowDropDown
                className={`text-base transition-transform duration-300 ${
                  dropdownState.isDropdownOpen
                    ? "rotate-180 text-[#ff4141]"
                    : ""
                }`}
              />
            </span>
            <ul
              className={`absolute left-0 mt-2 w-36 bg-white shadow-md border rounded-md transition-all duration-300 transform ${
                dropdownState.isDropdownOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 hover:bg-[#ff4141] hover:text-white text-xs transition-colors duration-300 cursor-pointer ${
                    location.pathname === category.path ? " text-[#ff4141]" : ""
                  }`}
                  onClick={() => {
                    navigate(category.path);
                    toggleDropdown("isDropdownOpen");
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </li>

          <li
            className={`cursor-pointer hover:text-[#ff4141] transition-colors duration-300 ${
              location.pathname === "/explore" ? "text-[#ff4141]" : ""
            }`}
            onClick={() => navigate("/explore")}
          >
            Explore
          </li>
          <li
            className={`cursor-pointer hover:text-[#ff4141] transition-colors duration-300 ${
              location.pathname === "/add-recipe" ? "text-[#ff4141]" : ""
            }`}
            onClick={() => navigate("/add-recipe")}
          >
            Add Recipe
          </li>

          {/* Profile/Login Section */}
          <div className="relative flex items-center gap-4">
            {!profile ? (
              <button
                className="text-[#ff4141] border border-[#ff4141] px-6 py-2 text-xs hover:bg-[#ff4141] hover:text-white transition-all duration-300"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <>
                <div
                  className="w-8 h-8 flex items-center justify-center bg-[#ff4141] text-white rounded-full text-sm font-semibold cursor-pointer transition-transform hover:scale-110 overflow-hidden"
                  onClick={() => toggleDropdown("isProfileOpen")}
                >
                  {profile?.profileImage &&
                  profile.profileImage !== "default-profile.png" ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    profile?.name?.[0]?.toUpperCase() || ""
                  )}
                </div>

                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 top-full bg-white shadow-md w-32 mt-3 rounded-sm border divide-y transition-all duration-300 transform ${
                    dropdownState.isProfileOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <p
                    className={`px-4 py-2 text-xs cursor-pointer transition-colors duration-300 ${
                      isProfileActive
                        ? " text-[#ff4141]"
                        : "hover:bg-[#ff4141] hover:text-white"
                    }`}
                    onClick={() => {
                      navigate("/profile");
                      toggleDropdown("isProfileOpen");
                    }} // Navigate to profile page
                  >
                    My profile
                  </p>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-[#ff4141] hover:text-white text-xs transition-colors duration-300"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </ul>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          dropdownState.isMobileMenuOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => toggleDropdown("isMobileMenuOpen")} // Click to close menu
      ></div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-md py-6 transform transition-transform duration-300 ${
          dropdownState.isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-[#ff4141]"
          onClick={() => toggleDropdown("isMobileMenuOpen")}
        >
          <MdClose />
        </button>

        <ul className="flex flex-col gap-8 text-xs uppercase items-start mt-12 pl-10">
          <li
            className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300"
            onClick={() => {
              navigate("/");
              toggleDropdown("isMobileMenuOpen");
            }}
          >
            Home
          </li>

          {/* Categories Mobile */}
          <div className="relative">
            <span
              className="flex items-center justify-center cursor-pointer hover:text-[#ff4141]"
              onClick={() => toggleDropdown("isDropdownOpen")}
            >
              Categories
              <MdArrowDropDown
                className={`ml-1 transition-transform ${
                  dropdownState.isDropdownOpen
                    ? "rotate-180 text-[#ff4141]"
                    : ""
                }`}
              />
            </span>
            {dropdownState.isDropdownOpen && (
              <ul className="mt-2 bg-white shadow-md border rounded-md">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-[#ff4141] hover:text-white text-xs transition-colors duration-300 cursor-pointer"
                    onClick={() => {
                      navigate(category.path);
                      toggleDropdown("isDropdownOpen");
                      toggleDropdown("isMobileMenuOpen");
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <li
            className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300"
            onClick={() => {
              navigate("/explore");
              toggleDropdown("isMobileMenuOpen");
            }}
          >
            Explore
          </li>
          <li
            className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300"
            onClick={() => {
              navigate("/add-recipe");
              toggleDropdown("isMobileMenuOpen");
            }}
          >
            Add Recipe
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
