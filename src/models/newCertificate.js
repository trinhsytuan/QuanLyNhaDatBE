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
    dientichxaydung: { type: Number },
    dientichsan: { type: Number },
    sohuuchung: { type: Number },
    sohuurieng: { type: Number },
    ketcau: { type: String },
    sotang: { type: Number },
    thoihansohuu: { type: Date },
    userRequest: { type: String },
    orgRequest: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
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
