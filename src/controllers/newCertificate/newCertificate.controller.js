const { recordNewUpdate } = require("../../constant/constant");
const { newCertificateModel } = require("../../models/newCertificate");
const {
  checkMessageDuplicateMongoAutoRender,
  checkMongoDelete,
} = require("../../utils/utils");

const createNewCeritificate = async (req, res) => {
  try {
    const response = await newCertificateModel.create(req.body);
    return res.status(200).json(response);
  } catch (e) {
    if (e.error == 11000) {
      return res.status(400).json({
        success: false,
        message: checkMessageDuplicateMongoAutoRender(e),
      });
    }
    res.status(400).json({ success: false, message: e.toString() });
  }
};
const editCertificate = async (req, res) => {
  try {
    const reqEdit = await newCertificateModel.findOneAndUpdate(
      { $id: _id },
      { ...req.body },
      recordNewUpdate
    );
    return res.status(200).json(reqEdit);
  } catch (e) {
    if (e.error == 11000) {
      return res.status(400).json({
        success: false,
        message: checkMessageDuplicateMongoAutoRender(e),
      });
    }
    res.status(400).json({ success: false, message: e.toString() });
  }
};
const removeCertificate = async (req, res) => {
  try {
    const remove = await newCertificateModel.deleteOne({ $id: _id });
    res.status(200).json({ success: true, message: checkMongoDelete(remove) });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
};
const sendCertificateToOrg = async (req, res) => {
  try {
    const { orgResponse } = req.body;
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
};
const responseCertificateToOrg = async (req, res) => {
  try {
    const { status, descriptionReject, _id } = req.body;
    const responseDB = await newCertificateModel.findOneAndUpdate(
      { $id: _id },
      { status, descriptionReject },
      recordNewUpdate
    );
    res.status(200).json(responseDB);
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
};
module.exports = {
  createNewCeritificate,
  editCertificate,
  removeCertificate,
  responseCertificateToOrg,
};
