const express = require('express');
const router = new express.Router();
const truckController = require('../controllers/truckController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect, authMiddleware.restrict('DRIVER'));

// /api/trucks
router.route('/')
    .get(truckController.getTrucks)
    .post(truckController.createTruck);

// /api/trucks/:id
router.route('/:id')
    .get(truckController.getTruckById)
    .put(truckController.updateTruckById)
    .delete(truckController.deleteTruckById);

// /api/trucks/:id/assign
router.route('/:id/assign')
    .post(truckController.assignTruckById);

module.exports = router;
