const jwt = require("jsonwebtoken");

const jwtSign = (payload) =>
  jwt.sign(payload, "secret", { expiresIn: 60 * 60 });
const jwtVerify = (token) => {
  try {
    return jwt.verify(token, "secret");
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { jwtSign, jwtVerify };
