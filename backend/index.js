const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const signupRoutes = require("./routes");

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", signupRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
