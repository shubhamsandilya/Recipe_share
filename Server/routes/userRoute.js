const express = require("express"); //import "express";
const { createUser } = require("../controller/userController");
// import userAuth from "../middleware/auth.js";
const route = express.Router();
route.post("/", createUser);
// route.put("/update-user", userAuth, updateUser);

module.exports = route;
