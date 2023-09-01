const express = require("express");
const https = require("https");
require("dotenv").config();
const path = require("path");
const app = express();
const userModel = require("./src/controllers/User/User");
const keyModal = require("./src/controllers/key/key.route");
const fs = require("fs");
var cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./src/config/database");
const { checkToken } = require("./src/utils/utils");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "*" }));
app.use("/api/images", express.static(path.join(__dirname, "uploads")));

// const options = {
//   key: fs.readFileSync("server.key"),
//   cert: fs.readFileSync("server.cert"),
// };
// const server = https.createServer(options, app);

app.use("/api/v1/user", userModel);
app.use("/api/v1/pki", checkToken, keyModal);
async function main() {
  try {
    await connection();
    app.listen(process.env.LISTEN_PORT, () => {
      console.log("Server running port:" + process.env.LISTEN_PORT);
    });
  } catch (error) {
    console.log(">>>> Error Connect to DB:", error);
    console.log("Server Error, please contact TServices");
    process.exit();
  }
}
main();
