const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const userChema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    org: { ref: "org", type: mongoose.Schema.Types.ObjectId, required: true },
    avatar: { type: String },
    orgTop: {
      ref: "org",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);
userChema.plugin(mongoosePaginate);
const userDB = mongoose.model("user", userChema);
module.exports = { userDB };
