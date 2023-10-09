require("dotenv").config();
const express = require("express");
const { getLand } = require("./land.controller");
const router = express.Router();
router.get("/getLand/:id", getLand);
module.exports = router;
