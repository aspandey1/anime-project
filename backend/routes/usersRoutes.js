const express = require("express");
const router = express.Router();
const {
  getMe,
  registerUser,
  loginUser,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMe);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
