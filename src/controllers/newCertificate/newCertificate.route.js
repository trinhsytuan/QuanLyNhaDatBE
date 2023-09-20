require("dotenv").config();
const express = require("express");
const { checkReceiver } = require("../../utils/utils");
const {
  createNewCeritificate,
  getCetificate,
} = require("./newCertificate.controller");
const router = express.Router();
router.post("/createNew", checkReceiver, createNewCeritificate);
router.get("/getCertificate/:id", getCetificate);
module.exports = router;
