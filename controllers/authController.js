const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// POST
// /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const {email, password, role} = req.body;

  const userExists = await User.findOne({email});

  if (userExists) {
    return res.status(400).json({message: 'User is already registered'});
  }

  const user = await User.create({email, password, role});

  if (user) {
    return res.status(200).json({message: 'Profile created successfully'});
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// POST
// /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const userExists = await User.findOne({email});
  if (userExists && (await userExists.matchPassword(password))) {
    res.status(200).json({
      jwt_token: generateToken(userExists._id),
    });
  } else {
    res.status(400);
    throw new Error('Login error');
  }
});

