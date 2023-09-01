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
  } catch (e) {
    return res.status(400).json({ success: false, message: JSON.stringify(e) });
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
    orgModel.paginate(search, { page, limit }, (err, result) => {
      if (result) res.status(200).json(result);
    });
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
