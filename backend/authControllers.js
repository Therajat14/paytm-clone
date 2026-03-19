const User = require("./db");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const a1 = await user.save();
    let token = jwt.sign({ userName: a1.name }, "secret");
    res.status(200).json({ a1, token });
  } catch (err) {
    res.status(404).json({ err });
  }
};

module.exports = { signup };
