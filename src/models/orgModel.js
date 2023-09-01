const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const orgSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, require: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);
orgSchema.plugin(mongoosePaginate);
const orgModel = mongoose.model("org", orgSchema);
module.exports = { orgModel };
