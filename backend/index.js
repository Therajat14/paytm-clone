const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const signupRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const accountRoutes = require("./routes/accountRoutes");
const morgan = require("morgan");

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", signupRoutes);

app.use("/api/account", accountRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
