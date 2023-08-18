const express = require("express");
const https = require("https");
require("dotenv").config();
const app = express();
app.use(express.json());
const userModel = require("./src/controllers/User/User");
const fs = require("fs");
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
const connection = require("./src/config/database");

app.use(cors({ credentials: true, origin: "*" }));
//--------Code use for Server, do not remove---------


// const options = {
//   key: fs.readFileSync("server.key"),
//   cert: fs.readFileSync("server.cert"),
// };
// const server = https.createServer(options, app);
//--------------The end--------------------------------
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
