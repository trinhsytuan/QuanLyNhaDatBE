const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const newCertificateSchema = new mongoose.Schema(
  {
    tennguoisudung: { type: String, required: true },
    diachithuongtru: { type: String, required: true },
    denghi: { type: String, required: true },
    Thuadatdangky: { type: String, required: true },
    Sothuadat: { type: Number, required: true },
    Tobandoso: { type: Number, required: true },
    Dientich: { type: Number, required: true },
    Sudungchung: { type: Number, required: true },
    Sudungrieng: { type: Number, required: true },
    Mucdichsd: { type: String, required: true },
    Tuthoidiem: { type: Date, required: true },
    Thoihandenghi: { type: Number, required: true },
    Nguongoc: { type: String, required: true },
    Taisan: { type: Array },
    Loainhao: { type: String },
    Dientichxaydung: { type: Number },
    Dientichsan: { type: Number },
    Sohuuchung: { type: Number },
    Sohuurieng: { type: Number },
    ketcau: { type: String },
    Sotang: { type: Number },
    Thoihansohuu: { type: Date },
    userRequest: { type: String },
    orgRequest: { type: String },
    orgResponse: { type: String },
    status: { type: String, default: "creating" },
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
