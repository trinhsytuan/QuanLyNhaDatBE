var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
require("dotenv").config();
var transporter = nodemailer.createTransport({
  service: "Gmail",
  name: "TServices",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const registerRegisty = (toEmail, username, password) => {
  var registerFrom = {
    from: "TServices",
    to: toEmail,
    subject: "Thông báo tài khoản mới",
    html: `
      <h4>Bạn đã được tạo tài khoản mới trong hệ thống quản lý nhà đất</h4>
<h5>Tài khoản:${username}</h5>
</br>
<h5>Mật khẩu: ${password}</h5>`,
  };

  transporter.sendMail(registerFrom, function (err, info) {
    if (err) {
      return true;
    } else {
      return false;
    }
  });
};
module.exports = { registerRegisty };
