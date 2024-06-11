import logo from "./logo.svg";
import "./App.css";
import NotFound from "./pages/NotFound";
import AddForm from "./pages/AddForm";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Details from "./pages/Details";
import BuyCoin from "./pages/BuyCoin";
// import food from "./assets/food.jpg";

import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<AddForm />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/products" element={<Products />} />
        <Route path="/buy-coin" element={<BuyCoin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
