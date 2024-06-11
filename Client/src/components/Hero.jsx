import React, { useState } from "react";
import Carousel from "./Carousel";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import { useSelector } from "react-redux";
import Swal from "react-sweetalert2";

function Hero() {
  const slides = [img1, img2, img3, img4, img5];
  const [swalProps, setSwalProps] = useState({});
  const { user } = useSelector((state) => state.user);
  const [swalShown, setSwalShown] = useState(false);

  const showSwal = () => {
    if (!user.email) {
      alert("Login to continue");
    } else {
      window.location.replace("/form");
    }
  };

  return (
    <div className="">
      <section className="text-gray-400  bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              A Culinary Journey Awaits
              <br className="hidden lg:inline-block" />
              Before They Sold Out
            </h1>
            <p className="mb-8 leading-relaxed">
              Embark on a gastronomic adventure, exploring the finest flavors
              from around the globe. From artisanal creations to organic
              delights, experience the true essence of food. Treat yourself to a
              symphony of flavors with our diverse menu. From cold-pressed
              juices to spicy tacos, each dish is a masterpiece waiting to be
              savored.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                See recipes
              </button>

              <button
                onClick={showSwal}
                className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
              >
                Add recipe
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full mt-8 md:mt-0">
            <Carousel autoSlide={true} className="h-80">
              {slides.map((s, index) => (
                <img
                  key={index}
                  src={s}
                  className="object-cover object-center rounded-lg w-full h-full"
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
