const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const transferModelSchema = new mongoose.Schema(
  {
    tennguoisudung: { type: String, required: true },
    cccd: { type: String, required: true },
    noicap: { type: String, required: true },
    ngaycapcccd: { type: Date, required: true },
    nghenghiep: { type: String, required: true },
    diachithuongtru: { type: String, required: true },
    tennguoisudungnhan: { type: String, required: true },
    cccdnhan: { type: String, required: true },
    noicapnhan: { type: String, required: true },
    ngaycapcccdnhan: { type: Date, required: true },
    nghenghiepnhan: { type: String, required: true },
    diachithuongtrunhan: { type: String, required: true },
    noidungbiendong: { type: String, required: true },
    noidungtruocbiendong: { type: String, required: true },
    noidungsaubiendong: { type: String, required: true },
    lydobiendong: { type: String, required: true },
    nghiavutaichinh: { type: String, required: true },
    giaytolienquan: { type: String },
    magiayto: {
      type: String,
      required: true,
    },
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
transferModelSchema.plugin(mongoosePaginate);
const transferModel = mongoose.model("transferModel", transferModelSchema);
module.exports = { transferModel };
