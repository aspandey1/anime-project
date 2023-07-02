const express = require("express");
const router = express.Router();
const { addAnime, getLibrary } = require("../controllers/libraryController");
const { protect } = require("../middleware/authMiddleware");

router.get("/getLibrary", getLibrary);
router.post("/addAnime", addAnime);

module.exports = router;
