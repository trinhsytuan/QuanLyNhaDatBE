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
} = require("./newCertificate.controller");
const router = express.Router();
router.post("/createNew", checkReceiver, createNewCeritificate);
router.get("/getCertificate/:id", getCetificate);
router.delete("/deleteCertificate/:id", checkReceiver, removeCertificate);
router.get("/getAllPagination", checkReceiver, getCertificateTable);
router.put("/editCertificate/:id", checkReceiver, editCertificate);
router.get("/getByCode/:magiayto", checkReceiver, getOneCertificate);
router.put("/sendCertificateToOrg/:id", checkReceiver, sendCertificateToOrg);
router.get("/getCertificateThamDinh", checkDepartment, getCertificateThamDinh)
module.exports = router;
