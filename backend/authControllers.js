const User = require("./db");

const signup = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const a1 = await user.save();
    res.json(a1);
  } catch (err) {
    res.send("error");
  }
};

module.exports = { signup };
