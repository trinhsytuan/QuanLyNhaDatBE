require("dotenv").config();
const express = require("express");
const { checkReceiver } = require("../../utils/utils");
const {
  createNewReCertificate,
  getCertificateById,
  deleteReCertificate,
  editReCertificate,
  getAllPaginationReCertificate,
  sendCertificateToOrgReCertificate,
} = require("./reCertificate.model");
const router = express.Router();
router.post("/create", checkReceiver, createNewReCertificate);
router.get("/getById/:id", getCertificateById);
router.get("/getPagination", getAllPaginationReCertificate);
router.delete("/deleteById/:id", checkReceiver, deleteReCertificate);
router.put("/edit/:id", checkReceiver, editReCertificate);
router.put("/sendCertificateToOrg/:id", checkReceiver, sendCertificateToOrgReCertificate);
module.exports = router;
