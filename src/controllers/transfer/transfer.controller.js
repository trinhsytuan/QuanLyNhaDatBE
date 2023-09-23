const {
  recordNewUpdate,
  TYPE_IMAGE_CAP_LAI,
} = require("../../constant/constant");
const { transferModel } = require("../../models/transfer");
const {
  checkMongoUpdate,
  checkMongoDelete,
  searchLike,
  makeid,
} = require("../../utils/utils");
const { getMediaInternal } = require("../media/media.controller");

const createReCertificate = async (req, res) => {
  try {
    const response = await transferModel.create({
      ...req.body,
      magiayto: "CL" + makeid(8),
      orgRequest: req.decodeToken.org?._id,
      userRequest: req.decodeToken._id,
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const editReCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await transferModel.findOneAndUpdate(
      { _id: id },
      { ...req, body },
      recordNewUpdate
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const removeReCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await transferModel.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: checkMongoDelete(response),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const getChuyenNhuong = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await transferModel.findOne({ _id: id });
    const promises = [getMediaInternal(id, TYPE_IMAGE_CAP_LAI.ANH_KHU_DAT)];

    const [anhkhudat] = await Promise.all(promises);
    return res.status(200).json({
      anhkhudat,
      ...response._doc,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const getReCertificatePagination = async (req, res) => {
  try {
    const { page, limit, status, ten, magiayto } = req.params;
    let pagination = null;
    if (limit == 0) pagination = false;
    else pagination = true;
    let search = {};
    if (status) search.status = status;
    if (ten) search.ten = searchLike(ten);
    if (magiayto) search.magiayto = magiayto;
    const result = await transferModel.paginate(search, {
      page,
      limit,
      pagination,
    });
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};

module.exports = {
  createReCertificate,
  editReCertificate,
  removeReCertificate,
  getReCertificatePagination,
  getChuyenNhuong,
};
