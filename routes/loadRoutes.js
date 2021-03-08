const express = require('express');
const router = new express.Router();
const loadController = require('../controllers/loadController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// /api/loads
router.route('/')
    .get(loadController.getLoads)
    .post(loadController.createLoad);

// /api/loads/active
router.route('/active')
    .get(authMiddleware.restrict('DRIVER'), loadController.getActiveLoads);

// /api/loads/active/state
router.route('/active/state')
    .patch(authMiddleware.restrict('DRIVER'), loadController.nextState);

// /api/loads/:id
router.route('/:id')
    .get(authMiddleware.restrict('SHIPPER'), loadController.getLoadById)
    .put(authMiddleware.restrict('SHIPPER'), loadController.updateById)
    .delete(authMiddleware.restrict('SHIPPER'), loadController.deleteById);

// /api/loads/:id/post
router.route('/:id/post')
    .post(authMiddleware.restrict('SHIPPER'), loadController.postLoad);

// /api/loads/:id/shipping_info
router.route('/:id/shipping_info')
    .get(authMiddleware.restrict('SHIPPER'), loadController.getShippinInfo);

module.exports = router;
