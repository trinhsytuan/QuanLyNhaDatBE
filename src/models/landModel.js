const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const newCertificateSchema = new mongoose.Schema(
  {
    tennguoisudung: { type: String, required: true },
    magiayto: { type: String },
    cccd: { type: String, required: true },
    noicap: { type: Boolean },
    ngaycapcccd: { type: Boolean },
    nghenghiep: { type: Boolean },
    sothuadat: { type: Boolean },
    thuadatdangky: { type: String, required: true },
    sothuadat: { type: String, required: true },
    tobandoso: { type: String, required: true },
    diachithuadat: { type: Number, required: true },
    sudungrieng: { type: Number, required: true },
    sudungchung: { type: Number, required: true },
    mucdichsudung: { type: String, required: true },
    thoihansudung: { type: Date, required: true },
    nguongocsudung: { type: Date, required: true },
    loainhao: { type: String },
    nghenghiep: { type: String, require: true },
    dientichxaydung: { type: Number },
    sotang: { type: Number },
    ketcau: { type: Number },
    diachikhudat: { type: Number },
    ngaycap: { type: String },
    sophathanh: { type: Number },
    txtId: { type: String },
  },
  { timestamps: true }
);
newCertificateSchema.plugin(mongoosePaginate);
const newCertificateModel = mongoose.model(
  "newCertificate",
  newCertificateSchema
);
module.exports = { newCertificateModel };
