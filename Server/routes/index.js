const express = require("express"); //import "express";

const userRoute = require("./userRoute.js");
const recipeRoute = require("./recipeRoute.js");

const router = express.Router();
const path = "/api/v1/";
// router.use(`${path}auth`, authRoute);
router.use(`${path}users`, userRoute);
router.use(`${path}recipe`, recipeRoute);
// router.use(`${path}jobs`, jobRoute);
// router.use(`${path}apply`, apply);

module.exports = router;
