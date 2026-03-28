const jwt = require("jsonwebtoken");

const jwtSign = (payload) =>
  jwt.sign(payload, "secret", { expiresIn: 60 * 60 });
const jwtVerify = (token) => jwt.verify(token, "secret");

module.exports = { jwtSign, jwtVerify };
