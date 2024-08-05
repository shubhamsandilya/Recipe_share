const express = require("express");
const {
  createRecipe,
  getRecipe,
  getEmail,
  getById,

  twitterAuth,
} = require("../controller/recipeController");
const authenticate = require("../middleware/auth");
const { TwitterApi } = require("twitter-api-v2");
const route = express.Router();
route.post("/", authenticate, createRecipe);
route.get("/", getRecipe);
route.get("/email", getEmail);
route.get("/getbyid", getById);
const twitterClient = new TwitterApi({
  appKey: "lMwnjm3jD2nUqbX5Esh8pKphA",
  appSecret: "aDoP0EQiAcOesSMYx36IWuBv48FjBMAuRTFiilMyPR50PhMH6p",
  callback: "https://www.youtube.com/watch?v=btWBQ1YhkDQ",
});
let oauthToken, oauthTokenSecret;

route.get("/auth/twitter", async (req, res) => {
  try {
    const { url, oauth_token, oauth_token_secret } =
      await twitterClient.generateAuthLink(process.env.CALLBACK_URL);

    oauthToken = oauth_token;
    oauthTokenSecret = oauth_token_secret;
    console.log(url, "==\n ", oauth_token, "==\n ", oauth_token_secret);
    res.redirect(url);
  } catch (error) {
    res.status(500).send("Error initiating Twitter authentication");
  }
});
route.get("/auth/twitter/pin", async (req, res) => {
  const { pin } = req.query;

  if (!pin) {
    return res.status(400).send("PIN is required");
  }

  try {
    const {
      client: loggedClient,
      accessToken,
      accessSecret,
    } = await twitterClient.login(oauthToken, pin, oauthTokenSecret);
    const { data: user } = await loggedClient.v2.me();

    res.json({
      accessToken,
      accessSecret,
      user,
    });
  } catch (error) {
    res.status(500).send("Error logging in with Twitter");
  }
});
route.get("/auth/twitter/callback", async (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;

  if (oauth_token !== oauthToken) {
    return res.status(400).send("OAuth token mismatch");
  }

  try {
    const {
      client: loggedClient,
      accessToken,
      accessSecret,
    } = await twitterClient.login(
      oauth_token,
      oauth_verifier,
      oauthTokenSecret
    );
    const { data: user } = await loggedClient.v2.me();

    res.json({
      accessToken,
      accessSecret,
      user,
    });
  } catch (error) {
    res.status(500).send("Error logging in with Twitter");
  }
});
module.exports = route;
