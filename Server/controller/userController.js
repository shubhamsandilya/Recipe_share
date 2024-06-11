// import mongoose, { Mongoose } from "mongoose";
const Users = require("../model/user.model");

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
module.exports = { createUser };
