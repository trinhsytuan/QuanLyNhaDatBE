const {
  getWalletSystemByUser,
  pushDataToBlockchain,
} = require("../../blockchain/baseConfig");
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
const { getMyKeyInternal } = require("../key/key.controller");
const { getMediaInternal } = require("../media/media.controller");

const createReCertificate = async (req, res) => {
  try {
    const response = await transferModel.create({
      ...req.body,
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
      { ...req.body },
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
    const {
      page,
      limit,
      status,
      tennguoisudung,
      tennguoisudungnhan,
      magiayto,
    } = req.query;
    let pagination = null;
    if (limit == 0) pagination = false;
    else pagination = true;
    let search = {};
    if (status) search.status = status;
    if (tennguoisudung) search.tennguoisudung = searchLike(tennguoisudung);
    if (tennguoisudungnhan)
      search.tennguoisudung = searchLike(tennguoisudungnhan);
    if (magiayto) search.magiayto = searchLike(magiayto);
    search.orgRequest = req.decodeToken.org?._id;
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
const sendTransferToOrg = async (req, res) => {
  try {
    const { id } = req.params;
    const { private_key } = req.body;
    const myPK = await getMyKeyInternal(req?.decodeToken._id);
    if (!myPK) {
      return res.status(200).json({
        message: "Tài khoản chưa có khoá",
        success: false,
      });
    }
    const constract = await getWalletSystemByUser(
      myPK.idSignature,
      myPK.publicKey,
      private_key
    );
    if (!req?.decodeToken?.orgTop) {
      return res.status(400).json({
        message: "Tài khoản chưa cấu hình tổ chức UBND / Tỉnh",
        success: false,
      });
    }
    const oldData = await transferModel.findOne({ _id: id });
    const responseBl = await pushDataToBlockchain(
      constract,
      oldData,
      oldData._id
    );
    const updatedResult = await transferModel.updateOne(
      { _id: id },
      {
        $set: {
          status: "sending",
          orgResponse: req.decodeToken.orgTop,
          txtId: JSON.parse(responseBl).txtId,
        },
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
  createReCertificate,
  editReCertificate,
  removeReCertificate,
  getReCertificatePagination,
  getChuyenNhuong,
  sendTransferToOrg,
};
