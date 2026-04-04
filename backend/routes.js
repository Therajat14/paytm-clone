const express = require("express");
const { signup, signin, updateUser } = require("./authControllers");
const authMiddleware = require("./middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update/", authMiddleware, updateUser);

module.exports = router;
