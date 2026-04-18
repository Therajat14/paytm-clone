const { User, Account } = require("../db");
const bcrypt = require("bcrypt");
const { signupSchema, signinSchema, userUpdate } = require("../validation");
const { jwtSign } = require("../jwt");
const mongoose = require("mongoose");

const signup = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid input" });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      [{ name, email, password: hashedPassword }],
      { session },
    );

    const account = await Account.create(
      [{ userid: user[0]._id, balance: Math.floor(Math.random() * 100000) }],
      { session },
    );

    const token = jwtSign({ userId: user[0]._id });

    await session.commitTransaction();

    res
      .status(201)
      .json({ message: "User created", token, account: account[0] });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ err: err.message });
  } finally {
    session.endSession();
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
  const filter = req.query.filter || "";

  const users = await User.find(
    {
      name: { $regex: filter, $options: "i" },
    },
    { name: 1, email: 1 },
  );
  res.status(200).json({ users });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    const account = await Account.findOne({ userid: req.userId });

    if (!user || !account) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log({
      name: user.name,
      email: user.email,
      balance: account.balance,
    });
    res.status(200).json({
      name: user.name,
      email: user.email,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, signin, updateUser, bulkUser, getUser };
