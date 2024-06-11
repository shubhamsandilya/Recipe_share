const express = require("express"); //import "express";

const userRoute = require("./userRoute.js");
const recipeRoute = require("./recipeRoute.js");

const router = express.Router();
const path = "/api/v1/";

router.use(`${path}users`, userRoute);
router.use(`${path}recipe`, recipeRoute);

module.exports = router;
