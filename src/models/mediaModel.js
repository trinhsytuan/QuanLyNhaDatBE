const { default: mongoose } = require("mongoose");
const mediaSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    url: { type: String },
    idForm: { type: String, required: true },
  },
  { timestamps: true }
);
const mediaModel = mongoose.model("media", mediaSchema);
module.exports = { mediaModel };
