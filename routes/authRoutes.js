/* eslint new-cap: ["error", { "capIsNewExceptionPattern": "^express\.." }] */
const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authController');
const {
  loginValidate,
  registerValidate,
} = require('../middleware/validationMiddleware');

// /api/auth/register
router.route('/register').post(registerValidate, register);

// /api/auth/login
router.route('/login').post(loginValidate, login);

module.exports = router;
