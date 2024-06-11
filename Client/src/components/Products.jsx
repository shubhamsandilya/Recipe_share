import React, { useState, useEffect } from "react";
import countries from "../pages/countries";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "./Loader";

function Products() {
  const { user } = useSelector((state) => state.user);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const queryParams = {
        category: category || "",
        country: country || "",
        title: title || "",
      };

      const queryString = new URLSearchParams(queryParams).toString();

      const response = await apiRequest({
        url: `/recipe?${queryString}`,
        token: user?.token,
        method: "GET",
      });

      console.log(response);
      setImages(response.data);
      setLoading(false); // Assuming the API response contains `data` field with the recipes
    } catch (error) {
      setLoading(false);
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = () => {
    fetchRecipes();
  };
  const handleBuy = async (e) => {
    if (!user.email) {
      alert("Login to continue");
    } else {
      try {
        setLoading(true);
        const response = await apiRequest({
          url: "/users/coin",
          token: user?.token,
          method: "GET",
        });
        if (response.data[0].coin < 10) {
          alert("Not enough coins");
          return;
        }
        const email = await axios.get(
          `https://recipe-share-pdlg.onrender.com/api/v1/recipe/email?id=${e.target.value}`
        );
        if (email.data.data.creatorEmail === user.email) {
          window.location.replace("/details/" + e.target.value);
          setLoading(false);
        } else {
          console.log(user?.token);
          alert("Spent 10 coins to buy this recipe");
          setLoading(true);
          const response = await apiRequest({
            url: `users/updateCoin?id=${e.target.value}`,
            token: user?.token,

            method: "GET",
          }).then(() => window.location.replace("/details/" + e.target.value));
          setLoading(false);
        }

        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  console.log(images);

  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <h1 className="text-4xl font-bold text-white mb-8">Our Recipes</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-5 flex-wrap">
              <input
                type="text"
                placeholder="Search by title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full md:w-auto bg-gray-800 text-white p-2 rounded-l mb-2 md:mb-0"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-1/4 bg-gray-800 text-white p-2 rounded-l md:rounded-none"
              >
                <option value="">All Categories</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full md:w-1/4 bg-gray-800 text-white p-2 rounded-l md:rounded-none rounded-r"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-2 ml-0 md:ml-2 rounded"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap -m-4">
              {images &&
                images.map((data, index) => (
                  <div
                    key={data._id}
                    value={data._id}
                    className="lg:w-1/4 md:w-1/2 p-4 w-full"
                  >
                    <a className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={data.image}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {data.category}
                      </h3>
                      <h2 className="text-white title-font text-lg font-medium">
                        {data.title}
                      </h2>
                      <div className="flex mt-3 items-baseline justify-center justify-evenly">
                        <p className="mt-1">$16.00</p>

                        <button
                          onClick={handleBuy}
                          value={data._id}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full mt-2"
                        >
                          Veiw now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
