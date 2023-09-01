require("dotenv").config();
const express = require("express");
const {
  createNewKey,
  revokeKey,
  getMyKey,
  updateTitleKey,
} = require("./key.controller");
const router = express.Router();
router.post("/createNew", createNewKey);
router.delete("/revoke", revokeKey);
router.get("/getMyKey", getMyKey);
router.put("/updateTitle", updateTitleKey);
module.exports = router;
