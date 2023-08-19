const { enrollByID, revokeIdentity } = require("../../blockchain/baseConfig");
const { queryUserFromDB, comparePasswords } = require("../../utils/utils");
const { pkiModel } = require("../../models/pkiModel");
const createNewKey = async (req, res) => {
  try {
    const { password } = req.body;
    const infoUser = await queryUserFromDB(req.decodeToken._id);
    const statusCode = await comparePasswords(password, infoUser.password);
    if (!statusCode) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu bạn vừa nhập không chính xác",
      });
    }
    const infoKeyEnroll = await enrollByID(req.decodeToken._id);
    const infoKeyStorage = {
      user: infoKeyEnroll.user,
      publicKey: infoKeyEnroll.credentials.certificate,
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
  const id = req.params.id;
  //const response = await pkiModel.deleteOne({ _id: id });
  const blockchainRevoke = await revokeIdentity(req.decodeToken._id);
  console.log(blockchainRevoke);
};
module.exports = {
  createNewKey,
  revokeKey,
};
