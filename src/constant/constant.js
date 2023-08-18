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
  DIRECTORY_IMAGE: "uploads/"
}
const recordNewUpdate = { new: true }; // Trả về tài liệu mới sau khi cập nhật
module.exports = {
  ROLE_SYSTEM,
  WRONG_PASSWORD,
  URL_BASE,
  recordNewUpdate,
};
