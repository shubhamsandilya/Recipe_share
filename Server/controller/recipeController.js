// import mongoose, { Mongoose } from "mongoose";
const Recipes = require("../model/recipe.model");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

const createRecipe = async (req, res, next) => {
  console.log(req);
  const { title, image, videoUrl, content, country, category } = req.body;
  try {
    if (!title || !image || !content || !country || !category || !videoUrl) {
      next("Please provide all required fields");
    }
    const user = await Recipes.create({
      title,
      image,
      videoUrl,
      content,
      country,
      category,
      creatorEmail: req.user.email,
    });
    res.status(200).json({
      success: true,
      message: "Recipe created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(404).json({ message: error.message });
  }
};
const getRecipe = async (req, res, next) => {
  try {
    const { category, country, title } = req.query;

    console.log(req?.query);
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (country) {
      filter.country = country;
    }
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const data = await Recipes.find(filter);

    res.status(200).json({
      success: true,
      message: "Recipes retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(404).json({ message: error.message });
  }
};
const getEmail = async (req, res, next) => {
  try {
    console.log("hii");
    console.log(req.query);
    const data = await Recipes.findById(req.query.id).select("creatorEmail");
    res.status(200).json({
      success: true,
      message: "Email retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(404).json({ message: error.message });
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const data = await Recipes.findById(id);
    await Recipes.updateOne({ _id: id }, { $inc: { watchCount: 1 } });

    res.status(200).json({
      success: true,
      message: "Recipes retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(404).json({ message: error.message });
  }
};
// const validateTwitter = async (req, res, next) => {
//   const TWITTER_CONSUMER_KEY = "lMwnjm3jD2nUqbX5Esh8pKphA";
//   const TWITTER_CONSUMER_SECRET =
//     "aDoP0EQiAcOesSMYx36IWuBv48FjBMAuRTFiilMyPR50PhMH6p";
//   passport.use(
//     new TwitterStrategy(
//       {
//         consumerKey: TWITTER_CONSUMER_KEY,
//         consumerSecret: TWITTER_CONSUMER_SECRET,
//         callbackURL: "https://www.youtube.com/watch?v=btWBQ1YhkDQ",
//       },
//       function (token, tokenSecret, profile, done) {
//         console.log(profile);
//         return done(null, profile);
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.deserializeUser((obj, done) => {
//     done(null, obj);
//   });

//   exports.initializePassport = (app) => {
//     app.use(passport.initialize());
//   };

//   exports.twitterAuth = passport.authenticate("twitter");

//   exports.twitterAuthCallback = passport.authenticate("twitter", {
//     failureRedirect: "/",
//   });

//   exports.profile = (req, res) => {
//     res.send(req.user); // User profile information
//   };
// };
const TWITTER_CONSUMER_KEY = "lMwnjm3jD2nUqbX5Esh8pKphA";
const TWITTER_CONSUMER_SECRET =
  "aDoP0EQiAcOesSMYx36IWuBv48FjBMAuRTFiilMyPR50PhMH6p";
passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "https://www.youtube.com/watch?v=btWBQ1YhkDQ",
    },
    function (token, tokenSecret, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

exports.initializePassport = (app) => {
  app.use(passport.initialize());
};

twitterAuth = passport.authenticate("twitter");

exports.twitterAuthCallback = passport.authenticate("twitter", {
  failureRedirect: "/",
});

exports.profile = (req, res) => {
  res.send(req.user); // User profile information
};

module.exports = {
  createRecipe,
  getRecipe,
  getEmail,
  getById,
  // validateTwitter,
  twitterAuth,
};
