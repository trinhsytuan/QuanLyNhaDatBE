const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDB } = require("../models/userModel");
const randomstring = require("randomstring");
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

module.exports = {
  makeid,
  hashPassword,
  comparePasswords,
  checkToken,
  queryUserFromDB,
};
