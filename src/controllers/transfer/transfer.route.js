require("dotenv").config();
const express = require("express");
const { checkReceiver } = require("../../utils/utils");
const {
  createReCertificate,
  getChuyenNhuong,
  editReCertificate,
  removeReCertificate,
  getReCertificatePagination,
} = require("./transfer.controller");
const router = express.Router();

router.post("/create", checkReceiver, createReCertificate);
router.get("/getById/:id", getChuyenNhuong);
router.put("/editReCertificate/:id", checkReceiver, editReCertificate);
router.delete("/deleteReCeritificate/:id", checkReceiver, removeReCertificate);
router.get("/getTableChuyenNhuong", checkReceiver, getReCertificatePagination);
module.exports = router;
