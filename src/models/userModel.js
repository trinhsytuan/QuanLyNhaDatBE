const { default: mongoose } = require("mongoose");

const userChema = new mongoose.Schema(
  {
    Username: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    email: { type: String, require: true },
    Phone: { type: String, required: true },
    Password: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const userDB = mongoose.model("User", userChema);
const verifyEmailChema = new mongoose.Schema({
  IDUser: { type: String, require: true },
  Hashkey: { type: String, require: true },
});
const userVerifyDB = mongoose.model("TempUser", verifyEmailChema);
module.exports = { userDB, userVerifyDB };
