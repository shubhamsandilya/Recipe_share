const mongoose = require("mongoose");
const validator = require("validator");

//schema
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    content: {
      type: String,
    },
    country: {
      type: String,
    },
    category: {
      type: String,
    },
    creatorEmail: {
      type: String,
    },
    watchCount: {
      type: Number,
      default: 0,
    },
    pruchasedBy: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
