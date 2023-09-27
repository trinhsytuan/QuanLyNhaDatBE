const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const reCertificateSchema = new mongoose.Schema(
  {
    tennguoisudung: { type: String, required: true },
    magiayto: { type: String },
    lydocaplai: { type: String },
  },
  { timestamps: true }
);
reCertificateSchema.plugin(mongoosePaginate);
const reCertificateModel = mongoose.model("reCertificate", reCertificateSchema);
module.exports = { reCertificateModel };
