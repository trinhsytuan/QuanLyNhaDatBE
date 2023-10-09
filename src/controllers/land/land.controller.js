const { landModel } = require("../../models/landModel");

const getLand = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id)
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy thông tin",
      });
    const response = await landModel.findOne({ magiayto: id });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.toString(),
    });
  }
};
module.exports = {
  getLand,
};
