const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const landModelSchema = new mongoose.Schema(
  {
    tennguoisudung: { type: String, required: true },
    magiayto: { type: String },
    cccd: { type: String, required: true },
    noicap: { type: String, require: true },
    ngaycapcccd: { type: Date, require: true },
    nghenghiep: { type: Boolean },
    sothuadat: { type: Boolean },
    thuadatdangky: { type: String, required: true },
    sothuadat: { type: String, required: true },
    tobandoso: { type: String, required: true },
    diachithuadat: { type: Number, required: true },
    sudungrieng: { type: Number, required: true },
    sudungchung: { type: Number, required: true },
    mucdichsd: { type: String, required: true },
    thoihansudung: { type: Date, required: true },
    nguongoc: { type: String, required: true },
    loainhao: { type: String },
    dientich: { type: String },
    nghenghiep: { type: String, require: true },
    dientichxaydung: { type: Number },
    sotang: { type: Number },
    ketcau: { type: Number },
    ngaycap: { type: String },
    txtId: { type: String },
  },
  { timestamps: true }
);
landModelSchema.plugin(mongoosePaginate);
const landModel = mongoose.model("land", landModelSchema);
module.exports = { landModel };
