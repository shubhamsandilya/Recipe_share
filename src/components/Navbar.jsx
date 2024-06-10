import React, { useState, useEffect } from "react";
import { FaPlus, FaCoins, FaBars, FaTimes } from "react-icons/fa";
import { auth, provider } from "../config/index";
import { signInWithPopup } from "firebase/auth";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [value, setValue] = useState("");
  const handleClick = () => {
    console.log("first");
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">FlavorFusion</span>
            </a>
            <div className="md:hidden">
              <button
                className="text-gray-400 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
          <nav
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:ml-auto md:mr-auto w-full md:w-auto mt-4 md:mt-0`}
          >
            <a className="mr-5 hover:text-white">Home</a>
            <a className="mr-5 hover:text-white">Recipes</a>
            <a className="mr-5 hover:text-white">Add Recipe</a>
            {/* <a className="mr-5 hover:text-white">Fourth Link</a> */}
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-auto">
            <button
              onClick={handleClick}
              className="inline-flex items-center py-1 px-3 focus:outline-none hover:text-white rounded text-base md:bg-gray-800 md:hover:bg-gray-700"
            >
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <button className="flex items-center bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600">
              <FaPlus className="mr-1" />
              <FaCoins className="mr-2" />
              <span className="text-lg font-semibold">123</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
