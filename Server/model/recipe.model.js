import mongoose from "mongoose";
import validator from "validator";

//schema
const recipeSchema = new mongoose.Schema(
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
    coin: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
