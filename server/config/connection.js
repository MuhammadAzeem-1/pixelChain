const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const CONNECTION_URL = process.env.CONNECTION_URL;

    await mongoose.connect(`${CONNECTION_URL}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;