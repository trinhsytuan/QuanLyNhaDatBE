const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const reCertificateChema = new mongoose.Schema(
  {
    ten: { type: String, required: true },
    diachi: { type: String, required: true },
    sovaoso: { type: String, required: true },
    sophathanh: { type: String, required: true },
    ngaycap: { type: Date, required: true },
    noidungbiendong: { type: String, required: true },
    noidungtrengcntruocbiendong: { type: String, required: true },
    noidungsaubiendong: { type: String, required: true },
    lydobiendong: { type: String, required: true },
    tinhhinhtaichinh: { type: String, required: true },
    giaytobosung: { type: String, required: true },
    tenchuyennhuong: { type: String, required: true },
    sinhnamchuyennhuong: { type: Date, required: true },
    socmndchuyennhuong: { type: String, required: true },
    noicapcmndchuyennhuong: { type: String, required: true },
    ngaycapcmndchuyennhuong: { type: String, required: true },
    nghenghiep: { type: String, required: true },
    diachithuongtru: { type: String, required: true },
    tennhanchuyen: { type: String, required: true },
    sinhnamnhanchuyen: { type: Date, required: true },
    socmndnhanchuyen: { type: String, required: true },
    noicapcmndnhanchuyen: { type: String, required: true },
    ngaycapcmndnhanchuyen: { type: Date, required: true },
    nghenghiepcmndnhanchuyen: { type: String, required: true },
    diachicmndnhanchuyen: { type: String, required: true },
    userRequest: { type: String },
    orgRequest: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
    },
    orgResponse: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
    },
    status: { type: String, default: "pending" },
    descriptionReject: { type: String },
  },
  { timestamps: true }
);
reCertificateChema.plugin(mongoosePaginate);
const rewCertificateModel = mongoose.model("reCertificate", reCertificateChema);
module.exports = { rewCertificateModel };
