const { rewCertificateModel } = require("../../models/reCertificate");
const { checkMongoUpdate } = require("../../utils/utils");

const createReCertificate = async (req, res) => {
  try{
    const response = await rewCertificateModel.create(...req.body);
    return res.status(200).json(response);
  } catch(e) {
    return res.status(400).json({
        success: false,
        message: e.toString()
    })
  }
};
const editReCertificate = async(req,res) => {
    try{
        const {id} = req.params;

    } catch(e) {
        return res.status(400).json({
            success: false,
            message: e.toString();
        })
    }
}
