const express = require("express");
const { createRecipe } = require("../controller/recipeController");
const authenticate = require("../middleware/auth");

const route = express.Router();
route.post("/", authenticate, createRecipe);

module.exports = route;
