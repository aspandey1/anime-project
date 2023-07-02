const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");

const getLibrary = asyncHandler(async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(400).json({ message: "please provide email" });
  }

  const user = await Users.findOne({ email });
  if (user) {
    res.status(200).json({ library: user.animeList });
    return;
  }
  res.status(400).json({ message: "error" });
});

const addAnime = asyncHandler(async (req, res) => {
  const animeID = parseInt(req.body.animeID);
  const email = req.body.email;

  if (!animeID || !email) {
    res.status(400).json({ message: "No anime or user id" });
    return;
  }
  const user = await Users.findOne({ email });
  if (user) {
    var inList = false;
    user.animeList.filter((element) => {
      if (element.get("animeId") == animeID) {
        inList = true;
      }
    });
    if (inList) {
      res.status(400).json({ message: "already in list" });
      return;
    }
    user.animeList.push({ animeId: animeID, rating: -1 });
    user.save();
    res.status(200).json({ message: user.animeList });
    return;
  }

  res.status(400).json({ message: "error" });
  return;
});

const deleteAnime = asyncHandler(async (req, res) => {
  email = req.body.email;
  animeID = req.body.animeID;

  if (!animeID || !email) {
    res.status(400).json({ message: "No anime or user id" });
    return;
  }
  const user = await Users.findOne({ email });
  if (user) {
    for (let i = 0; i < user.animeList.length; i++) {
      if (animeList[i].animeID == animeID) {
        user.animeList.splice(i, 1);
        user.save();
        res.status(400).json({ message: "already in list" });
        return;
      }
    }
  }

  res.status(400).json({ message: "error" });
  return;
});

module.exports = {
  getLibrary,
  addAnime,
};
