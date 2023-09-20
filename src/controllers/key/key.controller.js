const { enrollByID, revokeIdentity } = require("../../blockchain/baseConfig");
const {
  queryUserFromDB,
  comparePasswords,
  makeid,
  checkMongoUpdate,
} = require("../../utils/utils");
const { pkiModel } = require("../../models/pkiModel");
const { userDB } = require("../../models/userModel");
const createNewKey = async (req, res) => {
  try {
    const checkIsExist = await pkiModel.findOne({ user: req.decodeToken._id });
    if (checkIsExist) {
      return res
        .status(400)
        .json({ success: false, message: "Đã tồn tại key" });
    }
    const { password } = req.body;
    const infoUser = await queryUserFromDB(req.decodeToken._id);
    const statusCode = await comparePasswords(password, infoUser.password);
    if (!statusCode) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu bạn vừa nhập không chính xác",
      });
    }
    const idSignature = makeid(12);
    const infoKeyEnroll = await enrollByID(req.decodeToken._id, idSignature);
    const infoKeyStorage = {
      user: infoKeyEnroll.user,
      publicKey: infoKeyEnroll.credentials.certificate,
      idSignature,
      hashPublicKey: infoKeyEnroll.hashKey,
    };
    const response = await pkiModel.create(infoKeyStorage);
    return res.status(200).json({
      privateKey: infoKeyEnroll.credentials.privateKey,
      publicKey: infoKeyEnroll.credentials.certificate,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: JSON.stringify(e) });
  }
};
const revokeKey = async (req, res) => {
  try {
    const response = await pkiModel.findOneAndDelete({
      user: req.decodeToken._id,
    });
    const blockchainRevoke = await revokeIdentity(response.idSignature);
    res.status(200).json({ success: true, message: "Thu hồi thành công" });
  } catch (e) {
    res.status(400).json({ success: false, message: JSON.stringify(e) });
  }
};
const getMyKey = async (req, res) => {
  try {
    const keyInfo = await pkiModel
      .findOne({ user: req.decodeToken._id })
      .populate("user");
    return res.status(200).json(keyInfo);
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
};
const updateTitleKey = async (req, res) => {
  try {
    const { title } = req.body;
    const keyInfo = await pkiModel.updateOne(
      { user: req.decodeToken._id },
      { $set: { title } }
    );
    return res.status(200).json({
      success: true,
      message: checkMongoUpdate(keyInfo, "Cập nhật tiêu đề thành công"),
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
};

module.exports = {
  createNewKey,
  revokeKey,
  getMyKey,
  updateTitleKey,
};
