const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://therajat14:therajat14@therajat14.yma6r.mongodb.net/paytm",
  );
  console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = mongoose.Schema({
  name: String,
  email: { String },
  password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
