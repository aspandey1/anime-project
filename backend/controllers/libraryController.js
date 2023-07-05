const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");

const getLibrary = asyncHandler(async (req, res) => {
  const email = req.query.email;
  if (!email) {
    res.status(400).json({ message: "please provide email" });
    return;
  }

  const user = await Users.findOne({ email });
  if (user) {
    res.status(200).json({ library: user.animeList });
    return;
  }
  res.status(400).json({ message: "error" });
  return;
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
  if (user && user.animeList.length > 0) {
    for (let i = 0; i < user.animeList.length; i++) {
      if (user.animeList[i].get("animeId") == animeID) {
        user.animeList.splice(i, 1);
        user.save();
        res.status(200).json({ library: user.animeList });
        return;
      }
    }
  }

  res.status(400).json({ message: "error or nothing in library" });
  return;
});

module.exports = {
  getLibrary,
  addAnime,
  deleteAnime,
};
