import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Footer from "../components/Footer";
function Home() {
  return (
    <div>
      <Navbar />

      <Hero />
      <Products />
      <Footer />
    </div>
  );
}

export default Home;
