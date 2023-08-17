const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
async function checkToken(req, res, next) {
  const tokenFromClient =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (tokenFromClient) {
    try {
      const decoded = await jwt.verify(
        tokenFromClient,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.decodeToken = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(401).send({
      message: "No token provided.",
    });
  }
}
module.exports = {
  makeid,
  hashPassword,
  comparePasswords,
  checkToken,
};
