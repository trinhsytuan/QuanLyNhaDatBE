const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const reCertificateSchema = new mongoose.Schema(
  {
    magiayto: { type: String, require: true },
    lydocaplai: { type: String, require: true },
    tennguoisudung: { type: String, require: true },
    userRequest: { type: String },
    orgRequest: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
    },
    orgResponse: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
    },
    txtId: { type: String },
    status: { type: String, default: "pending" },
    descriptionReject: { type: String },
  },
  { timestamps: true }
);
reCertificateSchema.plugin(mongoosePaginate);
const reCertificateModel = mongoose.model("reCertificate", reCertificateSchema);
module.exports = { reCertificateModel };
