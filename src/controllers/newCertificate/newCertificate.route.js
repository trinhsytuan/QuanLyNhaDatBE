require("dotenv").config();
const express = require("express");
const { checkReceiver } = require("../../utils/utils");
const { createNewCeritificate } = require("./newCertificate.controller");
const router = express.Router();
router.post("/createNew", checkReceiver, createNewCeritificate);
module.exports = router;
