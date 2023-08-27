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
router.put("/revoke/:id", revokeKey);
router.get("/getMyKey", getMyKey);
router.put("/updateTitle/:id", updateTitleKey);
module.exports = router;
