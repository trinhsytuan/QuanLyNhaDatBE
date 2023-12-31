const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const newCertificateSchema = new mongoose.Schema(
  {
    tennguoisudung: { type: String, required: true },
    magiayto: { type: String },
    diachithuongtru: { type: String, required: true },
    dangkyquyensdd: { type: Boolean },
    capgcndoivoidat: { type: Boolean },
    dangkyquyenqldat: { type: Boolean },
    capgcnvoitaisan: { type: Boolean },
    thuadatdangky: { type: String, required: true },
    sothuadat: { type: String, required: true },
    tobandoso: { type: String, required: true },
    dientich: { type: Number, required: true },
    sudungchung: { type: Number, required: true },
    sudungrieng: { type: Number, required: true },
    mucdichsd: { type: String, required: true },
    tuthoidiem: { type: Date, required: true },
    thoihandenghi: { type: Date, required: true },
    nguongoc: { type: String, required: true },
    loainhao: { type: String },
    cccd: { type: String, require: true },
    noicap: { type: String, require: true },
    ngaycapcccd: { type: Date, require: true },
    nghenghiep: { type: String, require: true },
    dientichxaydung: { type: Number },
    dientichsan: { type: Number },
    sohuuchung: { type: Number },
    sohuurieng: { type: Number },
    ketcau: { type: String },
    sotang: { type: Number },
    thoihansohuu: { type: Date },
    diachithuadat: { type: String, require: true },
    userRequest: { type: String },
    orgRequest: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
    },
    orgResponse: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
      default: "6551e4629b8b2de5f827fc09",
    },
    txtId: { type: String },
    status: { type: String, default: "pending" },
    descriptionReject: { type: String },
  },
  { timestamps: true }
);
newCertificateSchema.plugin(mongoosePaginate);
const newCertificateModel = mongoose.model(
  "newCertificate",
  newCertificateSchema
);
module.exports = { newCertificateModel };
