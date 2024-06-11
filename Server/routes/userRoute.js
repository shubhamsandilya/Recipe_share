const express = require("express"); //import "express";
const {
  createUser,
  getCoin,
  updateCoin,
} = require("../controller/userController");
const authenticate = require("../middleware/auth");
// import userAuth from "../middleware/auth.js";
const route = express.Router();
route.post("/", authenticate, createUser);
route.get("/coin", authenticate, getCoin);
route.get("/updatecoin", authenticate, updateCoin);
// route.put("/update-user", userAuth, updateUser);

module.exports = route;
