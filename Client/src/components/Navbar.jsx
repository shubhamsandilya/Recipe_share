import React, { useState, useEffect } from "react";
import { FaPlus, FaCoins, FaBars, FaTimes } from "react-icons/fa";
import { auth, provider } from "../config/index";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { apiRequest } from "../utils";
import { Login, Logout } from "../redux/userSlice";
import { useSelector } from "react-redux";
// import logo from "../assets/logo.png";
function Navbar() {
  const { user } = useSelector((state) => state.user);
  const [userCoin, setCoin] = useState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log("first");
    signInWithPopup(auth, provider).then((data) => {
      const userInfo = {
        email: data.user.email,
        name: data.user.displayName,
        profileUrl: data.user.photoURL,
        token: data.user.accessToken,
      };
      console.log(data);

      dispatch(Login(userInfo));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      createUser(userInfo);
    });
  };
  const createUser = async (data) => {
    console.log(user);
    try {
      const response = await apiRequest({
        url: "/users",
        token: data?.token,
        data: data,
        method: "POST",
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };

  const showSwal = () => {
    if (!user.email) {
      alert("Login to continue");
    } else {
      window.location.replace("/form");
    }
  };
  const getCoin = async () => {
    try {
      const response = await apiRequest({
        url: "/users/coin",
        token: user?.token,
        method: "GET",
      });
      setCoin(response.data[0].coin);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleBuy = async () => {
    window.location.replace("/buy-coin");
  };
  const handleRecipe = async () => {
    window.location.replace("/products");
  };

  useEffect(() => {
    getCoin();
  }, []);
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
            <a href="/" className="mr-5 hover:text-white">
              Home
            </a>
            <a
              onClick={handleRecipe}
              href="#"
              className="mr-5 hover:text-white"
            >
              Recipes
            </a>
            <a
              onClick={showSwal}
              className="mr-5 hover:text-white cursor-pointer"
            >
              Add Recipe
            </a>
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-auto">
            {!user.email && (
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
            )}
            <button
              onClick={handleBuy}
              className="flex items-center bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
            >
              <FaPlus className="mr-1" />
              <FaCoins className="mr-2" />
              <span className="text-lg font-semibold">{userCoin || 0}</span>
            </button>
            {user.email && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={user.profileUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <svg
                    className="w-4 h-4 ml-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute rounded-lg right-0 mt-2 w-48  text-gray-700 rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-500 w-full text-center"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
