const {
  getWalletSystemByUser,
  pushDataToBlockchain,
} = require("../../blockchain/baseConfig");
const {
  recordNewUpdate,
  TYPE_IMAGE_CAP_MOI,
  STATUS_TD,
  getTop,
} = require("../../constant/constant");
const { landModel } = require("../../models/landModel");
const { newCertificateModel } = require("../../models/newCertificate");
const {
  checkMessageDuplicateMongoAutoRender,
  checkMongoDelete,
  searchLike,
  makeid,
  checkMongoUpdate,
} = require("../../utils/utils");
const { getMyKeyInternal } = require("../key/key.controller");
const { getMediaInternal } = require("../media/media.controller");
const { getOneOrg } = require("../org/org.controller");

const createNewCeritificate = async (req, res) => {
  try {
    const response = await newCertificateModel.create({
      ...req.body,
      orgRequest: req.decodeToken.org?._id,
      userRequest: req.decodeToken._id,
      magiayto: "KD" + makeid(8),
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
    const dataNotUpdate = await newCertificateModel.findOne({
      _id: id,
    });
    const responseBl = await pushDataToBlockchain(
      constract,
      dataNotUpdate,
      dataNotUpdate._id
    );
    const updatedResult = await newCertificateModel.updateOne(
      { _id: id },
      {
        $set: {
          status: "pending",
          orgResponse: getTop(req.body.org_current),
          txtId: JSON.parse(responseBl).txtId,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: checkMongoUpdate(updatedResult, "Gửi thẩm định thành công"),
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "Sai khoá bí mật" });
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
const getCertificateThamDinh = async (req, res) => {
  try {
    const search = {};
    let pagination = true;
    const { page, limit, tennguoisudung, diachithuongtru, status, magiayto } =
      req.query;
    if (tennguoisudung) search.page = searchLike(search.tennguoisudung);
    if (diachithuongtru) search.limit = searchLike(search.diachithuongtru);
    search.orgResponse = req.decodeToken.org?._id;
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
const getOneCertificate = async (req, res) => {
  try {
    const { magiayto } = req.params;
    const result = await newCertificateModel.findOne({ magiayto });
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({
      sucees: false,
      message: e.toString(),
    });
  }
};
const sendResultResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { private_key, status, description } = req.body;
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
    if (status == STATUS_TD.reject) {
      const updatedResult = await newCertificateModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            status: status,
            descriptionReject: description,
          },
        }
      );
      return res.status(200).json(updatedResult);
    }
    const dataNotUpdate = await newCertificateModel.findOne({
      _id: id,
    });
    let newDataLand = dataNotUpdate;
    delete newDataLand._id;
    delete newDataLand.createdAt;
    delete newDataLand.updatedAt;
    const responseBl = await pushDataToBlockchain(
      constract,
      {
        ...newDataLand,
        thoihansudung: newDataLand.thoihandenghi,
        ngaycap: new Date(),
      },
      newDataLand.magiayto
    );
    const createOneLand = await landModel.create({
      ...newDataLand.toObject(),
      thoihansudung: newDataLand.thoihandenghi,
      ngaycap: new Date(),
      txtId: JSON.parse(responseBl).txtId,
    });
    const updatedResult = await newCertificateModel.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: createOneLand,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ success: false, message: "Sai khoá bí mật" });
  }
};
module.exports = {
  createNewCeritificate,
  editCertificate,
  removeCertificate,
  sendCertificateToOrg,
  getCetificate,
  getCertificateTable,
  getOneCertificate,
  getCertificateThamDinh,
  sendResultResponse,
};
