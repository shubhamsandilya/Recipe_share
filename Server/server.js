const express = require("express"); //import "express";
const dotenv = require("dotenv");
const cors = require("cors");

const bodyParser = require("body-parser");

const dbConnection = require("./config/dbConnection.js");
const router = require("./routes/index.js");
const errorMiddleware = require("./middleware/error.js");

dbConnection();
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "15mb" }));

app.use(router);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
