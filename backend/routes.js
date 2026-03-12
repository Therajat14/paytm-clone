const express = require("express");
const { signup } = require("./authControllers");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;
