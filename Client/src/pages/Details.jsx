import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function Details() {
  const { id } = useParams();
  console.log(id);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://recipe-share-pdlg.onrender.com/api/v1/recipe/getbyid/?id=${id}`
        );
        console.log(response);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);
  const getYouTubeId = (url) => {
    // Regular expression to match YouTube video IDs
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2]) {
      return match[2];
    } else {
      return null;
    }
  };

  return (
    <div className="container mx-auto max-w-full h-full px-4 py-8 bg-gray-900 text-white">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <h1 className="text-3xl font-semibold">{recipe.data.title}</h1>
          </div>
          <div className="mb-8">
            <div className="relative h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(
                  recipe.data.videoUrl
                )}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <div dangerouslySetInnerHTML={{ __html: recipe.data.content }} />
            </h2>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Creator
            </h2>
            <ul className="list-decimal list-inside">
              <p>{recipe.data.creatorEmail}</p>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
