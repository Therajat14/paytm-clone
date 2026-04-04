const User = require("./db");
const bcrypt = require("bcrypt");
const { signupSchema, signinSchema, userUpdate } = require("./validation");
const { jwtSign } = require("./jwt");

const signup = async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.errors,
      });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwtSign({ userId: user._id });

    res.status(201).json({
      message: "User created",
      token,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.errors,
      });
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwtSign({ userId: user._id });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateUser = async (req, res) => {
  const { success } = userUpdate.safeParse(req.body);
  if (!success) res.status(400).json({ message: "Invalid input" });
  const user = await User.findByIdAndUpdate(req.userId, req.body);
  console.log(user);
  res.status(200).json({ message: "User updated" });
};

const bulkUser = async (req, res) => {
  const filter = req.body.filter || "";

  const users = await User.find({
    name: { $regex: filter },
  });
  res.status(200).json({ users });
};

module.exports = { signup, signin, updateUser, bulkUser };
