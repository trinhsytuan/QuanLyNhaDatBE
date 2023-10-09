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
} = require("./reCertificate.model");
const router = express.Router();
router.post("/create", checkReceiver, createNewReCertificate);
router.get("/getById/:id", getCertificateById);
router.get("/getPagination", getAllPaginationReCertificate);
router.delete("/deleteById/:id", checkReceiver, deleteReCertificate);
router.put("/edit/:id", checkReceiver, editReCertificate);
router.put(
  "/sendCertificateToOrg/:id",
  checkReceiver,
  sendCertificateToOrgReCertificate
);
router.get(
  "/getPaginationDepartment",
  checkDepartment,
  getAllPaginationReCertificateDepartment
);
module.exports = router;
