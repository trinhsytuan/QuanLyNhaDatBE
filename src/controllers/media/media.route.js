require("dotenv").config();
const express = require("express");
const { imageUpload } = require("../../utils/uploadImage");
const {
  uploadNewMedia,
  deleteMedia,
  getMediaByIdForm,
} = require("./media.controller");
const router = express.Router();
router.post("/create", imageUpload.single("image"), uploadNewMedia);
router.delete("/delete/:id", deleteMedia);
router.get("/getMediaByIdForm/:id", getMediaByIdForm);
module.exports = router;
