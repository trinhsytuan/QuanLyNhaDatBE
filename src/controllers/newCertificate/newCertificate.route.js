require("dotenv").config();
const express = require("express");
const { checkReceiver } = require("../../utils/utils");
const { createNew } = require("./newCertificate.controller");
const router = express.Router();
router.post("/createnew", checkReceiver, createNew);
module.exports = router;
