const express = require("express");
// const https = require("https");
require("dotenv").config();
const path = require("path");
const app = express();
const userModel = require("./src/controllers/User/User");
// const fs = require("fs");
var cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./src/config/database");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "*" }));
app.use("/api/images",express.static(path.join(__dirname, "uploads")));
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
