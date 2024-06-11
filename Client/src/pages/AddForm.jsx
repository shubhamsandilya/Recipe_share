import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
// Importing a list of countries, you can find this list online or use a package
import countries from "./countries"; // Assuming you have a countries.js file exporting an array of country names
import "./ckeditor.css";
import { apiRequest, handleFileUpload } from "../utils";
function AddForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    image: null,
    category: "",

    country: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setFormState((prevState) => ({
      ...prevState,
      content: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic
    setIsLoading(true);

    const uri = formState.image && (await handleFileUpload(formState.image));
    const newData = uri ? { ...formState, image: uri } : formState;
    try {
      const res = await apiRequest({
        url: "/recipe/",
        token: user?.token,
        data: newData,
        method: "POST",
      });
      console.log(res);
      alert(res.message);
      window.location.replace("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Recipe</h1>

      <div className="max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-lg font-medium mb-1">
              Content
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={formState.content}
              onChange={handleContentChange}
              // editorStyle={{ backgroundColor: "#f4f5f7", color: "black" }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-lg font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formState.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="country" className="block text-lg font-medium mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formState.country}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="videoUrl"
              className="block text-lg font-medium mb-1"
            >
              Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formState.videoUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="https://example.com/video"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-lg font-medium mb-1">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
