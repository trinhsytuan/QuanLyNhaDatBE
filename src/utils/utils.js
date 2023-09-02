const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDB } = require("../models/userModel");
const randomstring = require("randomstring");
const crypto = require("crypto");
const { ROLE_SYSTEM } = require("../constant/constant");

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
function checkSystem(req, res, next) {
  if (req.decodeToken.org.type == ROLE_SYSTEM.SYSTEM) next();
  else
    return res.status(401).send({
      message: "You are not authozied to perform this action",
    });
}
function checkDepartment(req, res, next) {
  if (req.decodeToken.org.type == ROLE_SYSTEM.DEPARTMENT) next();
  else
    return res.status(401).send({
      message: "You are not authozied to perform this action",
    });
}
function checkReceiver(req, res, next) {
  if (req.decodeToken.org.type == ROLE_SYSTEM.RECEIVER) next();
  else
    return res.status(401).send({
      message: "You are not authozied to perform this action",
    });
}
function queryUserFromDB(idUser) {
  try {
    return userDB.findOne({ _id: idUser }).populate("org");
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
  } else throw new Error("Lỗi khi cập nhật thông tin");
}
function checkMongoDelete(mongo, message = "Xoá bản ghi thành công") {
  if (mongo.deletedCount === 1) {
    return message;
  } else {
    throw new Error("Không tồn tại bản ghi");
  }
}
function searchLike(params) {
  return params ? new RegExp(params, "i") : null;
}
module.exports = {
  makeid,
  hashPassword,
  checkMongoDelete,
  checkSystem,
  comparePasswords,
  checkToken,
  searchLike,
  queryUserFromDB,
  computeMD5Hash,
  checkMongoUpdate,
  checkReceiver,
  checkDepartment,
};
