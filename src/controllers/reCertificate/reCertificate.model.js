const { recordNewUpdate } = require("../../constant/constant");
const { reCertificateModel } = require("../../models/reCertificate");

const createNewReCertificate = async (req, res) => {
  try {
    const { lydocaplai, magiayto } = req.body;
    const response = await reCertificateModel.create({
      magiayto,
      lydocaplai,
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
  } catch (e) {}
};
module.exports = {
  createNewReCertificate,
};
