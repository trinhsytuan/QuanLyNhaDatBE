require("dotenv").config();
const express = require("express");
const { checkReceiver } = require("../../utils/utils");
const { createNewReCertificate } = require("./reCertificate.model");
const router = express.Router();
router.post("/create", checkReceiver, createNewReCertificate);
module.exports = router;
