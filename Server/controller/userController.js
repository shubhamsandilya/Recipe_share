// import mongoose, { Mongoose } from "mongoose";
const Users = require("../model/user.model");

const createUser = async (req, res, next) => {
  console.log("first");
  console.log(req.body);
  const { name, email, profileUrl, token } = req.body;
  try {
    if (!name || !email) {
      next("Please provide all required fields");
    }

    const user = await Users.create({
      Name: name,
      email,
      profileUrl,
      token,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
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
