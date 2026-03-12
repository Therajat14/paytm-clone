const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./db");

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
