const express = require("express");
const {
  signup,
  signin,
  updateUser,
  bulkUser,
  getUser,
} = require("../controller/authControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update/", authMiddleware, updateUser);
router.get("/bulk", bulkUser);
router.get("/me", authMiddleware, getUser);
module.exports = router;
