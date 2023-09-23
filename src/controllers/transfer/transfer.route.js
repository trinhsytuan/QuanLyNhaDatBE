require("dotenv").config();
const express = require("express");
const { checkReceiver } = require("../../utils/utils");
const { createReCertificate, getChuyenNhuong } = require("./transfer.controller");
const router = express.Router();

router.post("/create", checkReceiver, createReCertificate);
router.get("/getById/:id", getChuyenNhuong);
module.exports = router;
