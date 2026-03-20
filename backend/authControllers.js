const User = require("./db");
const jwt = require("jsonwebtoken");
const { jwtSign, jwtVerify } = require("./jwt");

const signup = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const a1 = await user.save();
    let token = jwtSign({ userName: a1.name });
    res.status(200).json({ a1, token });
  } catch (err) {
    res.status(404).json({ err });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    let token = jwtSign({ userName: user.name });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(404).json({ err });
  }
};

module.exports = { signin, signup };
