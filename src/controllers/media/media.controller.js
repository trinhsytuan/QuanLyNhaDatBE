const { log } = require("console");
const { sort_time } = require("../../constant/constant");
const { mediaModel } = require("../../models/mediaModel");
const { checkMongoDelete } = require("../../utils/utils");
const fs = require("fs");
const path = require("path");
const uploadNewMedia = async (req, res) => {
  try {
    const jsonData = await JSON.parse(req.body.jsonData);
    const response = await mediaModel.create({
      fileName: req.file.filename,
      url: "/api/images/" + req.file.filename,
      type: jsonData.type,
      idForm: jsonData.idForm,
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await mediaModel.deleteOne({ fileName: id });
    const imagePath = path.join(__dirname, "../../..", "uploads", id);
    let successSent = false;
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        successSent = true;

        return res.status(404).json({
          success: false,
          message: "Ảnh không tồn tại trên Server",
        });
      }
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          successSent = true;
          return res.status(404).json({
            success: false,
            message: "Ảnh không tồn tại trên Server",
          });
        } else {
          return res.status(200).json({
            suceess: true,
            message: checkMongoDelete(response),
          });
        }
      });
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const getMediaByIdForm = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await mediaModel.sort(sort_time).find({ idForm: id });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const getMediaInternal = async (id, type) => {
  const response = await mediaModel.find({ idForm: id, type }).sort(sort_time);
  return response;
};
module.exports = {
  uploadNewMedia,
  getMediaByIdForm,
  deleteMedia,
  getMediaInternal,
};
