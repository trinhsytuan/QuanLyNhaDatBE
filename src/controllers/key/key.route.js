require("dotenv").config();
const express = require("express");
const { createNewKey, revokeKey } = require("./key.controller");
const router = express.Router();
router.post("/createNew", createNewKey);
router.put("/revoke/:id", revokeKey);
module.exports = router;
