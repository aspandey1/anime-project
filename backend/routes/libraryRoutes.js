const express = require("express");
const router = express.Router();
const {
  addAnime,
  getLibrary,
  deleteAnime,
} = require("../controllers/libraryController");
const { protect } = require("../middleware/authMiddleware");

router.get("/getLibrary", getLibrary);
router.post("/addAnime", addAnime);
router.post("/deleteAnime", deleteAnime);

module.exports = router;
