const bcrypt = require("bcrypt");
require("dotenv").config();
const express = require("express");
const { userDB } = require("../../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { username, password, email, name, phone } = req.body;
  const infoDataUser = await userDB.findOne({ Username: username });
  if (!infoDataUser) {
    res.status(401).json({ EC: 401 });
    return;
  }
  const pwFind = infoDataUser.Password;
  const statusCode = bcrypt.compareSync(password, pwFind);
  if (statusCode == false) {
    res.status(401).json({ EC: 401 });
    return;
  }
  //registerRegisty(email, name);
  var accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({
    EC: 0,
    token: accessToken,
  });
};

const userRegister = async (req, res) => {
  try {
    const { Username, Password, Name, Email, Phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    if (Password.length <= 6) {
      res.status(402).json({ ER: 402 });
      return;
    }
    const hashPassword = bcrypt.hashSync(Password, salt);
    const checkRegister = await userDB.findOne({ Username: Username });
    if (checkRegister) {
      res.status(409).json({
        ER: 1,
        error: "Username has already taken",
      });
      return;
    }
    const UserCreate = await userDB.create({
      Username,
      Password: hashPassword,
      Phone,
      Name,
      Email,
    });
    res.status(200).json({
      ER: 0,
      data: UserCreate,
    });
  } catch (ex) {
    res.status(401).json({ ER: 401, error: ex });
  }
};

router.post("/login", userLogin);
router.post("/register", userRegister);
module.exports = router;
