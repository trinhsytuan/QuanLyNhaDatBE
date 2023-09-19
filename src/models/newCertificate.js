const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const newCertificateSchema = new mongoose.Schema(
  {
    tennguoisudung: { type: String, required: true },
    diachithuongtru: { type: String, required: true },
    dangkyquyensdd: { type: Boolean },
    capgcndoivoidat: { type: Boolean },
    dangkyquyenqldat: { type: Boolean },
    capgcnvoitaisan: { type: Boolean },
    Thuadatdangky: { type: String, required: true },
    Sothuadat: { type: Number, required: true },
    Tobandoso: { type: Number, required: true },
    Dientich: { type: Number, required: true },
    Sudungchung: { type: Number, required: true },
    Sudungrieng: { type: Number, required: true },
    Mucdichsd: { type: String, required: true },
    Tuthoidiem: { type: Date, required: true },
    Thoihandenghi: { type: Date, required: true },
    Nguongoc: { type: String, required: true },
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
    orgResponse: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
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
