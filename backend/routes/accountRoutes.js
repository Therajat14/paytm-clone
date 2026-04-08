const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { Account } = require("../db");
const router = express.Router();
const mongoose = require("mongoose");
const { tranferMoney } = require("../accountControllers");

router.post("/transfer", authMiddleware, tranferMoney);

module.exports = router;
