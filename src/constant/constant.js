const ROLE_SYSTEM = {
  SYSTEM: "system",
  DEPARTMENT: "department",
  USER: "user",
  LANDOFFICER: "landofficer", //Cán bộ địa chính
  VICEPRESIDENTCITY: "vicepresidentcity", //Phó chủ tịch thành phố
  PRESIDENTWARD: "presidentward", // Phó chủ tịch phường
  LANDREGISTRATION: "landregistration", // Văn phòng đăng ký đất đại
};
const WRONG_PASSWORD = {
  success: false,
  message: "Tên đăng nhập hoặc mật khẩu không chính xác",
};
const URL_BASE = {
  DIRECTORY_IMAGE: "uploads/",
};
const recordNewUpdate = { new: true }; // Trả về tài liệu mới sau khi cập nhật
const location_blockchain = {
  WALLET_SERVER:
    "/root/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json",
  CERT_SERVER: "/root/apiWeb/src/blockchain/wallet",
};
const sort_time = { createdAt: -1 };
const TYPE_IMAGE_CAP_MOI = {
  ANH_KHU_DAT: "anh-khu-dat",
  DON_DANG_KY: "don-dang-ky",
  CHUNG_TU_NGHIA_VU_TAI_CHINH: "chung-tu-nghia-vu-tai-chinh",
  HOP_DONG: "hop-dong",
  OTHER: "other",
};
const TYPE_IMAGE_CAP_LAI = {
  ANH_KHU_DAT: "anh-khu-dat",
};
const STATUS_TD = {
  reject: "reject",
  accepted: "accepted",
  pending: "pending",
  sending: "sending",
};
const getTop = (id) => {
  if (id == "6551e4629b8b2de5f827fc09") return "655345032d09038a42cd8751";
  if (id == "655345032d09038a42cd8751") return "6551e5ac9b8b2de5f827fc3b";
  if (id == "6551e5ac9b8b2de5f827fc3b") return "655345142d09038a42cd8755";
  if (id == "655345142d09038a42cd8755") return "655333de9b8b2de5f827fcd9";
  if (id == "655333de9b8b2de5f827fcd9") return "655345462d09038a42cd875f";
};
module.exports = {
  ROLE_SYSTEM,
  WRONG_PASSWORD,
  URL_BASE,
  recordNewUpdate,
  location_blockchain,
  TYPE_IMAGE_CAP_MOI,
  sort_time,
  TYPE_IMAGE_CAP_LAI,
  STATUS_TD,
  getTop,
};
