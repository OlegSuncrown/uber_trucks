const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400);
    throw new Error('Invalid token or no token');
  }

  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      res.status(400);
      throw new Error('Token expired');
    }

    const user = await User.findById(verified.id).select('-password');

    if (!user) {
      res.status(400);
      throw new Error('User is not registered');
    }
    req.user = user;
    req.userId = verified.id;
    next();
  }
});

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(400);
      throw new Error('Resticted access');
    }
    next();
  };
};

