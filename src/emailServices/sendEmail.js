var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
require('dotenv').config()
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "noreply@sytuan.net",
    pass: "vlgqdisqbsfedmxy",
  },
});

const registerRegisty = (toEmail, token) => {
  var registerFrom = {
    from: "TBlog",
    to: toEmail,
    subject: "Thông báo xác thực tài khoản",
    html:
      '<p style="text-align:center"><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/TBlogNotRemove.png" style="height:84px; width:280px" /></p><p style="text-align:center">&nbsp;</p><p style="text-align:center"><span style="font-family:Times New Roman,Times,serif"><span style="font-size:14px"><strong>Y&Ecirc;U CẦU X&Aacute;C THỰC T&Agrave;I KHOẢN</strong></span></span></p><p>Ch&agrave;o bạn đ&atilde; đăng k&yacute; t&agrave;i khoản tại TBlog</p><p>Để k&iacute;ch hoạt t&agrave;i khoản của bạn, bạn cần phải nhấp v&agrave;o li&ecirc;n kết sau: ' +
      process.env.LINKWEB +
      "/" +
      token +
      "</p><p>&nbsp;</p><p>Cảm ơn bạn đ&atilde; đăng k&yacute; TBlog!</p>",
  };

  transporter.sendMail(registerFrom, function (err, info) {
    if (err) {
      return true;
    } else {
      return false;
    }
  });
};
module.exports={registerRegisty}