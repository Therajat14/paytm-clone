const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  tranferMoney,
  getBalance,
} = require("../controller/accountControllers");
router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, tranferMoney);

module.exports = router;
