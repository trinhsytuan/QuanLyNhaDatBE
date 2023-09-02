const { orgModel } = require("../../models/orgModel");
const {
  checkMongoUpdate,
  checkMongoDelete,
  searchLike,
} = require("../../utils/utils");

async function createOrg(req, res) {
  try {
    const { name, email, phone, address, type } = req.body;
    const response = await orgModel.create({
      name,
      email,
      phone,
      address,
      type,
    });
    return res.status(200).json(response);
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKeyError = error.keyPattern;
      if (duplicateKeyError.name === 1) {
        return res.status(400).json({ message: "Tên đã tồn tại" });
      }
      if (duplicateKeyError.email === 1) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }
      if (duplicateKeyError.phone === 1) {
        return res.status(400).json({ message: "SĐT đã tồn tại" });
      }
    } else {
      res.status(400).json({ message: error.toString() });
    }
  }
}
async function editOrg(req, res) {
  try {
    const { name, email, phone, address, type } = req.body;
    const { id } = req.params;
    const response = await orgModel.updateOne(
      { _id: id },
      { name, email, phone, address, type }
    );
    return res
      .status(200)
      .json({ success: true, message: checkMongoUpdate(response) });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
}
async function deleteOrg(req, res) {
  try {
    const { id } = req.params;
    const response = await orgModel.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: checkMongoDelete(response) });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
}
async function getAllOrgPagination(req, res) {
  try {
    const { name, type } = req.query;
    const search = {};
    if (name) {
      if (name.like) search.name = searchLike(name.like);
      else search.name = name;
    }
    if (type) search.type = type;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const pagination = limit == 0 ? false : true;
    const result = await orgModel.paginate({}, { page, limit, pagination });
    if (result) {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
}
module.exports = {
  createOrg,
  editOrg,
  deleteOrg,
  getAllOrgPagination,
};
