const { newCertificateModel } = require("../../models/newCertificate");
const { checkMessageDuplicateMongoAutoRender } = require("../../utils/utils");

const createNew = async (req, res) => {
  try {
    const response = newCertificateModel.create(req.body);
    return res.status(200).json(response);
  } catch (e) {
    if (e.error == 11000) {
      return res
        .status(400)
        .json({
          success: false,
          message: checkMessageDuplicateMongoAutoRender(e),
        });
    }
    res.status(400).json({ success: false, message: e.toString() });
  }
};
module.exports = {
  createNew,
};
