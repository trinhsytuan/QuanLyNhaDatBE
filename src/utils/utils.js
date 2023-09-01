const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDB } = require("../models/userModel");
const randomstring = require("randomstring");
const crypto = require("crypto");

function makeid(length) {
  return randomstring.generate(length);
}
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
async function checkToken(req, res, next) {
  const tokenFromClient =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (tokenFromClient) {
    try {
      const decoded = await jwt.verify(
        tokenFromClient,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.decodeToken = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(401).send({
      message: "No token provided.",
    });
  }
}
function queryUserFromDB(idUser) {
  try {
    return userDB.findOne({ _id: idUser });
  } catch (e) {
    throw new Error(e);
  }
}

function computeMD5Hash(input) {
  const hash = crypto.createHash("md5").update(input).digest("hex");
  return hash;
}
function checkMongoUpdate(mongo, message = "Cập nhật thông tin thành công") {
  if (mongo.matchedCount > 0) {
    return message;
  } else throw new Error(mongo);
}
module.exports = {
  makeid,
  hashPassword,
  comparePasswords,
  checkToken,
  queryUserFromDB,
  computeMD5Hash,
  checkMongoUpdate,
};
