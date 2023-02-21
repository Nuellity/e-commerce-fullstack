require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connected successfully!");
  } catch (error) {
    console.error("mongoDB connnection failed!!!");
    process.exit(1);
  }
};

module.exports = connectDatabase;
