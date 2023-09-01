require("dotenv").config();
const express = require("express");
const { checkSystem } = require("../../utils/utils");
const {
  createOrg,
  editOrg,
  deleteOrg,
  getAllOrgPagination,
} = require("./org.controller");
const router = express.Router();
router.post("/createNewOrg", checkSystem, createOrg);
router.put("/editOrg/:id", checkSystem, editOrg);
router.delete("/deleteOrg/:id", checkSystem, deleteOrg);
router.get("/getOrg", checkSystem, getAllOrgPagination);
module.exports = router;
