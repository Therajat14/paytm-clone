const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const signupRoutes = require("./routes");
const authMiddleware = require("./middleware/authMiddleware");

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", signupRoutes);
app.get("/api/test", authMiddleware, (req, res) =>
  res.send("Hello " + req.userId),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
