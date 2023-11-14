require("dotenv").config();
const express = require("express");
const { checkReceiver, checkDepartment } = require("../../utils/utils");
const {
  createNewCeritificate,
  getCetificate,
  removeCertificate,
  getCertificateTable,
  editCertificate,
  getOneCertificate,
  sendCertificateToOrg,
  getCertificateThamDinh,
  sendResultResponse,
} = require("./newCertificate.controller");
const router = express.Router();
router.post("/createNew", createNewCeritificate);
router.get("/getCertificate/:id", getCetificate);
router.delete("/deleteCertificate/:id", removeCertificate);
router.get("/getAllPagination", getCertificateTable);
router.put("/editCertificate/:id", editCertificate);
router.get("/getByCode/:magiayto", getOneCertificate);
router.put("/sendCertificateToOrg/:id", sendCertificateToOrg);
router.get("/getCertificateThamDinh", getCertificateThamDinh);
router.put("/sendResultThamDinh/:id", sendResultResponse);
module.exports = router;
