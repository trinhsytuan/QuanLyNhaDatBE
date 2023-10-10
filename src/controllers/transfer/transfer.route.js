require("dotenv").config();
const express = require("express");
const { checkReceiver, checkDepartment } = require("../../utils/utils");
const {
  createReCertificate,
  getChuyenNhuong,
  editReCertificate,
  removeReCertificate,
  getReCertificatePagination,
  sendTransferToOrg,
  getReCertificatePaginationDepartment,
  sendResultToUserTransfer,
} = require("./transfer.controller");
const router = express.Router();

router.post("/create", checkReceiver, createReCertificate);
router.get("/getById/:id", getChuyenNhuong);
router.put("/editReCertificate/:id", checkReceiver, editReCertificate);
router.delete("/deleteReCeritificate/:id", checkReceiver, removeReCertificate);
router.get("/getTableChuyenNhuong", checkReceiver, getReCertificatePagination);
router.put("/sendCertificateToOrg/:id", checkReceiver, sendTransferToOrg);
router.get(
  "/getTableChuyenNhuongDepartment",
  checkDepartment,
  getReCertificatePaginationDepartment
);
router.put("/sendResultToOrg/:id", checkDepartment, sendResultToUserTransfer);
module.exports = router;
