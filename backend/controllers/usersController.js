const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");

// @desc    Get User data
// @route   GET /api/users
// @acess   Private

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Users.findById(req.body.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// @desc    POST User data
// @route   POST /api/users
// @acess   Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = await req.body;
  res.status(200).json({
    name,
    email,
    password,
  });
});

module.exports = {
  getMe,
  registerUser,
};
