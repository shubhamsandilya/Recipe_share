import React, { useState, useEffect } from "react";
import countries from "../pages/countries";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "./Loader";
import styled from "styled-components";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const GalleryStyles = styled.div`
  .gallery__grid {
    display: grid;
    gap: 2rem;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    justify-content: center;
  }
  .gallery__title {
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }

  .item {
    min-width: 200px;
    width: 260px;
    margin: auto;
    border: 3px solid var(--gray-1);
    padding: 1rem;
  }
  .item__btns {
    display: flex;
    justify-content: space-between;
    button {
      font-size: 1.125rem;
      background-color: var(--gray-1);
      padding: 0.2rem 0.5rem;
      height: 3rem;
      border-radius: 8px;
      font-weight: bolder;
    }
  }
  .item-img {
    width: 140px;
    height: 140px;
    margin: auto;
    margin-bottom: 1rem;
    img {
      object-fit: contain;
    }
  }
  .item-title {
    font-size: 1rem;
    height: 82px;
    text-align: center;
    margin-bottom: 1rem;
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .item-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    width: 60px;
  }
  .item__btnadd {
    border: 2px solid var(--red-1);
    color: var(--red-1);
  }
  .item-price {
    font-size: 2.5rem;
    color: var(--blue-1);
    text-align: center;
    margin-bottom: 1rem;
  }
  .item__btnbuy {
    border: 2px solid var(--red-1);
    background-color: var(--red-1) !important;
    color: var(--gray-1);
  }
  .item-start {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid yellow;
    svg {
      font-size: 1rem;
    }
  }
  .skeleton {
    margin-bottom: 1rem;
  }
`;
function Products() {
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const rowSkeletons = 8;
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
  if (loading) {
    let rows = [];
    for (let index = 0; index < rowSkeletons; index++) {
      rows.push(
        <section>
          <article className="item">
            <div className="item-img">
              <Skeleton width={140} height={140} />
            </div>
            <h3 className="item-title">
              <Skeleton count={4} />
            </h3>
            <div className="item-info">
              <Skeleton width={160} height={20} />
              <Skeleton width={22} height={22} circle={true} />
            </div>
          </article>
        </section>
      );
    }

    return (
      <SkeletonTheme className="" highlightColor="#ffffff">
        <GalleryStyles className="gallery__grid bg-gray-900">
          <h2 className="gallery__title">
            <Skeleton />
          </h2>
          <div className="gallery__grid">{rows}</div>
        </GalleryStyles>
      </SkeletonTheme>
    );
  }

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
  const handleFav = () => {
    alert("Favourite added");
  };
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <h1 className="text-4xl font-bold text-white mb-8">Our Recipes</h1>

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
      </section>
    </div>
  );
}

export default Products;
