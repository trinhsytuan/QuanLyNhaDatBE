const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const userModel = require("./src/controllers/User/User");
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
const connection = require("./src/config/database");

app.use(cors({ credentials: true, origin: "*" }));
app.use("/api/v1/user", userModel);

(async () => {
  try {
    await connection();
    app.listen(process.env.LISTEN_PORT, () => {
      console.log("OK");
    });
  } catch (error) {
    console.log(">>>> Error Connect to DB:", error);
    console.log("Server Error, please contact TServices");
    process.exit();
  }
})();
