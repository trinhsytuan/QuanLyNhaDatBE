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

router.post("/create",  createReCertificate);
router.get("/getById/:id", getChuyenNhuong);
router.put("/editReCertificate/:id",  editReCertificate);
router.delete("/deleteReCeritificate/:id",  removeReCertificate);
router.get("/getTableChuyenNhuong",  getReCertificatePagination);
router.put("/sendCertificateToOrg/:id",  sendTransferToOrg);
router.get(
  "/getTableChuyenNhuongDepartment",
  
  getReCertificatePaginationDepartment
);
router.put("/sendResultToOrg/:id",  sendResultToUserTransfer);
module.exports = router;
