const { mediaModel } = require("../../models/mediaModel");
const { checkMongoDelete } = require("../../utils/utils");

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
    return res.status(200).json({
      suceess: true,
      message: checkMongoDelete(response),
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
    const response = await mediaModel.find({ idForm: id });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
module.exports = {
  uploadNewMedia,
  getMediaByIdForm,
  deleteMedia,
};
