const { recordNewUpdate } = require("../../constant/constant");
const { reCertificateModel } = require("../../models/reCertificate");
const {
  checkMongoDelete,
  searchLike,
  checkMongoUpdate,
} = require("../../utils/utils");

const createNewReCertificate = async (req, res) => {
  try {
    const { lydocaplai, magiayto, tennguoisudung } = req.body;
    const response = await reCertificateModel.create({
      magiayto,
      lydocaplai,
      tennguoisudung,
      orgRequest: req.decodeToken.org?._id,
      userRequest: req.decodeToken._id,
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(403).json({
      message: e.toString(),
      status: false,
    });
  }
};

const editReCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await reCertificateModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      recordNewUpdate
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e.toString(),
      success: false,
    });
  }
};
const deleteReCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await reCertificateModel.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: checkMongoDelete(response),
    });
  } catch (e) {
    return res.status(401).json({
      message: e.toString(),
      success: false,
    });
  }
};
const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await reCertificateModel.findOne({ _id: id });
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const getAllPaginationReCertificate = async (req, res) => {
  try {
    const { magiayto, tennguoisudung } = req.query;
    const search = {};
    if (magiayto) {
      search.magiayto = magiayto;
    }
    if (tennguoisudung) search.tennguoisudung = searchLike(tennguoisudung);
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const pagination = limit == 0 ? false : true;
    search.orgRequest = req.decodeToken.org._id;
    const result = await reCertificateModel.paginate(search, {
      page,
      limit,
      pagination,
    });
    if (result) {
      return res.status(200).json(result);
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
const sendCertificateToOrgReCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req?.decodeToken?.orgTop) {
      return res.status(400).json({
        message: "Tài khoản chưa cấu hình tổ chức UBND / Tỉnh",
        success: false,
      });
    }
    const updatedResult = await reCertificateModel.updateOne(
      { _id: id },
      {
        status: "sending",
        orgResponse: req.decodeToken.orgTop,
      }
    );
    return res.status(200).json({
      success: true,
      message: checkMongoUpdate(updatedResult, "Gửi duyệt thành công"),
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
};
module.exports = {
  createNewReCertificate,
  getCertificateById,
  deleteReCertificate,
  editReCertificate,
  getAllPaginationReCertificate,
  sendCertificateToOrgReCertificate,
};
