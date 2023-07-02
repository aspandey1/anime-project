const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      requried: [true, "Please add firstname"],
    },
    lastName: {
      type: String,
      requried: [true, "Please add lastname"],
    },
    email: {
      type: String,
      requried: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      requried: [true, "Please add a password"],
    },
    animeList: {
      type: [{ type: Map, of: Number }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
