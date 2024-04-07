const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    let URL = "mongodb://127.0.0.1:27017/mydb";
    await mongoose.connect(URL,
      {
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB Connected: ${URL}`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = connectDB;
