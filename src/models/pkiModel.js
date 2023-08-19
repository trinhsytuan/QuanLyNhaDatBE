const { default: mongoose } = require("mongoose");

const pkeyModel = new mongoose.Schema(
  {
    user: [
      { ref: "_id", type: mongoose.Schema.Types.ObjectId, required: true },
    ],
    publicKey: { type: String, required: true },
    hashPublicKey: { type: String },
    idSignature: { type: String },
  },
  { timestamps: true }
);
const pkiModel = mongoose.model("pki", pkeyModel);
module.exports = { pkiModel };
