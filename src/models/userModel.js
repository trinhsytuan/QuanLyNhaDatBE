const { default: mongoose } = require("mongoose");

const userChema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    org: { type: String, required: true },
    type: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);
const userDB = mongoose.model("user", userChema);
module.exports = { userDB };
