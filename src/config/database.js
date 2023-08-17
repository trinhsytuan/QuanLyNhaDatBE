const { default: mongoose } = require("mongoose");
require("dotenv").config;
const connection = async () => {
  try {
    const options = {
      dbName: "QuanLyNhaDat",
    };
    await mongoose.connect(process.env.DB_HOST, options);
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log("ERRROR:>>>>", error);
  }
};
module.exports = connection;
