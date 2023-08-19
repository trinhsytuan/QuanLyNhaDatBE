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
  CERT_SERVER: "/root/apiServer/src/blockchain/wallet",
};
module.exports = {
  ROLE_SYSTEM,
  WRONG_PASSWORD,
  URL_BASE,
  recordNewUpdate,
  location_blockchain,
};
