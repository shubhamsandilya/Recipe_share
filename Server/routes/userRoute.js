const express = require("express"); //import "express";
const { createUser } = require("../controller/userController");
const authenticate = require("../middleware/auth");
// import userAuth from "../middleware/auth.js";
const route = express.Router();
route.post("/", authenticate, createUser);
// route.put("/update-user", userAuth, updateUser);

module.exports = route;
