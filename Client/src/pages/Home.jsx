import React from "react";
// import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
// import Footer from "../components/Footer";
import { useSelector } from "react-redux";
function Home() {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      <Hero />
      <Products />
    </div>
  );
}

export default Home;
