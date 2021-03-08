/* eslint-disable */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {changePasswordValidate} = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// /api/users/me
router.route('/')
    .get(userController.getUserProfile)
    .delete(authMiddleware.restrict('SHIPPER'), userController.deleteUser);

// /api​/users​/me​/password
router.route('/password')
    .patch(changePasswordValidate, userController.updatePassword);
    
module.exports = router;