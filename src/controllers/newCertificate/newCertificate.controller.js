const {
  recordNewUpdate,
  TYPE_IMAGE_CAP_MOI,
} = require("../../constant/constant");
const { newCertificateModel } = require("../../models/newCertificate");
const {
  checkMessageDuplicateMongoAutoRender,
  checkMongoDelete,
  searchLike,
  makeid,
} = require("../../utils/utils");
const { getMediaInternal } = require("../media/media.controller");

const createNewCeritificate = async (req, res) => {
  try {
    const response = await newCertificateModel.create({
      ...req.body,
      orgRequest: req.decodeToken.org?._id,
      userRequest: req.decodeToken._id,
      magiayto: "GT" + makeid(8),
    });
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
    const { id } = req.params;
    const reqEdit = await newCertificateModel.findOneAndUpdate(
      { _id: id },
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
    const { id } = req.params;
    const remove = await newCertificateModel.deleteOne({ _id: id });
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
const getCetificate = async (req, res) => {
  const { id } = req.params;
  try {
    const promises = [
      getMediaInternal(id, TYPE_IMAGE_CAP_MOI.ANH_KHU_DAT),
      getMediaInternal(id, TYPE_IMAGE_CAP_MOI.CHUNG_TU_NGHIA_VU_TAI_CHINH),
      getMediaInternal(id, TYPE_IMAGE_CAP_MOI.DON_DANG_KY),
      getMediaInternal(id, TYPE_IMAGE_CAP_MOI.HOP_DONG),
      getMediaInternal(id, TYPE_IMAGE_CAP_MOI.OTHER),
    ];

    const [anhkhudat, taichinh, dondangky, hopdong, other] = await Promise.all(
      promises
    );

    const certificate = await newCertificateModel.findOne({ _id: id });
    const response = {
      anhkhudat,
      taichinh,
      dondangky,
      hopdong,
      other,
      ...certificate._doc,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.toString() });
  }
};
const getCertificateTable = async (req, res) => {
  try {
    const search = {};
    let pagination = true;
    const { page, limit, tennguoisudung, diachithuongtru, status, magiayto } =
      req.query;
    if (tennguoisudung) search.page = searchLike(search.tennguoisudung);
    if (diachithuongtru) search.limit = searchLike(search.diachithuongtru);
    search.orgRequest = req.decodeToken.org?._id;
    if (status) search.status = status;
    if (limit == 0) pagination = false;
    if (magiayto) search.magiayto = magiayto;
    const result = await newCertificateModel.paginate(search, {
      page,
      limit,
      pagination,
    });
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
module.exports = {
  createNewCeritificate,
  editCertificate,
  removeCertificate,
  sendCertificateToOrg,
  getCetificate,
  getCertificateTable,
};
