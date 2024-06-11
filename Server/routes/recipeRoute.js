const express = require("express");
const {
  createRecipe,
  getRecipe,
  getEmail,
  getById,
} = require("../controller/recipeController");
const authenticate = require("../middleware/auth");

const route = express.Router();
route.post("/", authenticate, createRecipe);
route.get("/", getRecipe);
route.get("/email", getEmail);
route.get("/getbyid", getById);

module.exports = route;
