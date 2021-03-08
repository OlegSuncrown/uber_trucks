const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// GET
// /api/users/me
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.status(200).json({user});
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

// PATCH
// /api/users/me
const updatePassword = asyncHandler(async (req, res) => {
  const {oldPassword, newPassword} = req.body;

  const user = await User.findById(req.user._id);

  if (await user.matchPassword(oldPassword)) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({message: 'Password changed successfully'});
  } else {
    res.status(400);
    throw new Error('Invalid old password');
  }
});

// DELETE
// /api/users/me
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await user.remove();
    // await Note.deleteMany({userId: req.userId});
    res.status(200).json({message: 'Profile deleted successfully'});
  } else {
    res.status(400);
    throw new Error('Invalid old password');
  }
});
module.exports = {getUserProfile, updatePassword, deleteUser};
