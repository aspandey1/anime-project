const express = require("express");
const router = express.Router();
const { getMe, registerUser } = require("../controllers/usersController");

router.get("/", getMe);
router.post("/", registerUser);

module.exports = router;
