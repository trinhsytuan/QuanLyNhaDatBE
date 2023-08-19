const { enrollByID, revokeIdentity } = require("../../blockchain/baseConfig");
const {
  queryUserFromDB,
  comparePasswords,
  makeid,
} = require("../../utils/utils");
const { pkiModel } = require("../../models/pkiModel");
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
    const id = req.params.id;
    const response = await pkiModel.deleteOne({ _id: id });
    const blockchainRevoke = await revokeIdentity(req.decodeToken._id);
    if (response.deletedCount == 1) {
      res.status(200).json({ success: true, message: "Revoke success" });
    } else {
      res.status(400).json({ success: false, message: "Revoke unsucefully" });
    }
  } catch (e) {
    res.status(400).json({ success: false, message: JSON.stringify(e) });
  }
};

module.exports = {
  createNewKey,
  revokeKey,
};
