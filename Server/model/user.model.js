const mongoose = require("mongoose");
const validator = require("validator");

//schema
const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, " Name is Required!"],
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
      validate: validator.isEmail,
    },
    profileUrl: {
      type: String,
    },
    token: {
      type: String,
    },
    coin: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
