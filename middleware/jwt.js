require("dotenv").config();
const jwt = require("jsonwebtoken");
const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "300s" });
};
module.exports = createToken;
