// import mongoose, { Mongoose } from "mongoose";
const Recipe = require("../model/recipe.model");
const Users = require("../model/user.model");
const mongoose = require("mongoose");

const createUser = async (req, res, next) => {
  console.log("first");
  const { name, email, profileUrl, token } = req.body;
  try {
    if (!name || !email) {
      next("Please provide all required fields");
    }
    const ifExist = await Users.findOne({ email });
    console.log(ifExist);
    if (ifExist) {
      // if user already exists
      return res.status(200).json({
        success: true,
        message: "User already registered successfully",
      });
    }
    const user = await Users.create({
      Name: name,
      email,
      profileUrl,
      token,
      userId: req.user.user_id,
    });
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    // next(error);
    // res.status(404).json({ message: error.message });
  }
};
const getCoin = async (req, res, next) => {
  try {
    const data = await Users.find({ userId: req.user.user_id }).select("coin");
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateCoin = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.query);
    console.log("======id  ", id);
    const data = await Users.updateOne(
      { userId: req.user.user_id },
      { $inc: { coin: -10 } }
    );
    const user = await Recipe.findOne({ _id: id });
    console.log("====== email ", user);
    const update = await Users.updateOne(
      { email: user.creatorEmail },
      { $inc: { coin: 1 } }
    );
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { createUser, getCoin, updateCoin };
