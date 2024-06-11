// import mongoose, { Mongoose } from "mongoose";
const Recipes = require("../model/recipe.model");

const createRecipe = async (req, res, next) => {
  console.log(req);
  const { title, image, videoUrl, content, country, category } = req.body;
  try {
    if (!title || !image || !content || !country || !category || !videoUrl) {
      next("Please provide all required fields");
    }
    const user = await Recipes.create({
      title,
      image,
      videoUrl,
      content,
      country,
      category,
      creatorEmail: req.user.user_id,
    });
    res.status(200).json({
      success: true,
      message: "Recipe created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(404).json({ message: error.message });
  }
};
module.exports = { createRecipe };
