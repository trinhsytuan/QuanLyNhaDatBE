require("dotenv").config();
const express = require("express");
const { checkReceiver, checkDepartment } = require("../../utils/utils");
const {
  createNewReCertificate,
  getCertificateById,
  deleteReCertificate,
  editReCertificate,
  getAllPaginationReCertificate,
  sendCertificateToOrgReCertificate,
  getAllPaginationReCertificateDepartment,
  sendReCertificateResultResponse,
} = require("./reCertificate.model");
const router = express.Router();
router.post("/create",  createNewReCertificate);
router.get("/getById/:id", getCertificateById);
router.get("/getPagination", getAllPaginationReCertificate);
router.delete("/deleteById/:id",  deleteReCertificate);
router.put("/edit/:id",  editReCertificate);
router.put(
  "/sendCertificateToOrg/:id",
  
  sendCertificateToOrgReCertificate
);
router.get(
  "/getPaginationDepartment",
  
  getAllPaginationReCertificateDepartment
);
router.put(
  "/sendResultToUser/:id",
  
  sendReCertificateResultResponse
);
module.exports = router;
