import React from "react";
import { motion } from "framer-motion";
import { GiCook } from "react-icons/gi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#ff4141] text-white py-8 px-6 md:px-12 relative overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating Animation */}
      <motion.div
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-30 blur-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      ></motion.div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <motion.h2
          className="uppercase font-light text-base flex items-center gap-1"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <GiCook className="text-lg text-white mb-1" />
          Recipe <span className="text-white font-semibold">Master</span>
        </motion.h2>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-sm mt-4 md:mt-0">
          {["Home", "Explore", "Categories", "Add Recipe"].map((item, index) => (
            <motion.li
              key={index}
              className="cursor-pointer hover:text-black transition"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
            (Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="p-2 bg-white rounded-full text-[#ff4141] hover:bg-black hover:text-white transition"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            )
          )}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm mt-6 opacity-80">
        &copy; {new Date().getFullYear()} Recipe Master. All Rights Reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
