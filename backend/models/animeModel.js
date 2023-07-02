const mongoose = require("mongoose");

const animeSchema = mongoose.Schema({
  animeID: {
    type: Number,
    requried: [true, "Anime ID requried"],
  },
  comments: {
    type: [String],
  },
});

module.exports = mongoose.model("Anime", animeSchema);
