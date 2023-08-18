const bcrypt = require("bcrypt");
require("dotenv").config();
const express = require("express");
const { userDB } = require("../../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  makeid,
  hashPassword,
  comparePasswords,
  checkToken,
} = require("../../utils/utils");
const { registerRegisty } = require("../../emailServices/sendEmail");
const { WRONG_PASSWORD } = require("../../constant/CONSTANT.JS");
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const infoDataUser = await userDB.findOne({ username });
  if (!infoDataUser) {
    return res.status(401).json(WRONG_PASSWORD);
  }

  const statusCode = await comparePasswords(password, infoDataUser.password);
  if (statusCode == false) {
    return res.status(401).json(WRONG_PASSWORD);
  }
  //registerRegisty(email, name);
  var token = jwt.sign(infoDataUser.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ token });
};

const userRegister = async (req, res) => {
  try {
    const { username, email, phone, name, org, type } = req.body;
    const randomPassword = makeid(10);
    const newPassword = await hashPassword(randomPassword);
    const UserCreate = await userDB.create({
      username,
      email,
      phone,
      name,
      org,
      type,
      password: newPassword,
    });
    registerRegisty(email, username, randomPassword);
    res.status(200).json(UserCreate);
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKeyError = error.keyPattern;
      if (duplicateKeyError.username === 1) {
        return res.status(400).json({ message: "Username đã tồn tại" });
      }
      if (duplicateKeyError.email === 1) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }
      if (duplicateKeyError.phone === 1) {
        return res.status(400).json({ message: "SĐT đã tồn tại" });
      }
    } else {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
};
const myInfo = async (req, res) => {
  const infoUser = await userDB.findOne({ _id: req.decodeToken._id });
  return res.status(200).json(infoUser);
};
router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/myInfo", checkToken, myInfo);
module.exports = router;
