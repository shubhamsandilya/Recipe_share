const Mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const dbConnect = await Mongoose.connect(
      process.env.MONGODB_URL.toString()
    );
    console.log("DB Connected Successfully 😊");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
