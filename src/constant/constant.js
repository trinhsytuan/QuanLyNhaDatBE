const ROLE_SYSTEM = {
  SYSTEM: "system",
  DEPARTMENT: "department",
  RECEIVER: "receiver",
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
module.exports = {
  ROLE_SYSTEM,
  WRONG_PASSWORD,
  URL_BASE,
  recordNewUpdate,
  location_blockchain,
  TYPE_IMAGE_CAP_MOI,
  sort_time,
};
