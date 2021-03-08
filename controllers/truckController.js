const asyncHandler = require('express-async-handler');
const Truck = require('../models/truckModel');
const truckType = require('../consts/truck');

// POST
// /api/trucks
exports.createTruck = asyncHandler(async (req, res) => {
  const user = req.user;
  const type = req.body.type;
  await Truck.create({
    ...req.body,
    created_by: user.id,
    dimensions: truckType[type].dimensions,
    payload: truckType[type].payload,
  });

  res.status(200).json({message: 'Truck created successfully'});
});

// GET
// /api/trucks
exports.getTrucks = asyncHandler(async (req, res) => {
  const user = req.user;
  const trucks = await Truck.find({created_by: user._id});

  if (trucks) {
    res.status(200).json({trucks});
  } else {
    res.status(400);
    throw new Error('No trucks found');
  }
});

// GET
// /api/trucks/:id
exports.getTruckById = asyncHandler(async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const truck = await Truck.findOne({_id: id, created_by: user._id});
  if (truck) {
    res.status(200).json({truck});
  } else {
    res.status(400);
    throw new Error('No truck found');
  }
});

// PUT
// /api/trucks/:id
exports.updateTruckById = asyncHandler(async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const type = req.body.type;

  const truck = await Truck.findOne({_id: id, created_by: user._id});

  if (truck) {
    truck.type = type;
    truck.dimensions = truckType[type].dimensions;
    truck.payload = truckType[type].payload;
    await truck.save();
    res.status(200).json({message: 'Truck details changed successfully'});
  } else {
    res.status(400);
    throw new Error('No truck found');
  }
});

// DELETE
// /api/trucks/:id
exports.deleteTruckById = asyncHandler(async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const truck = await Truck.findOne({_id: id, created_by: user._id});

  if (truck) {
    // if (truck._id.toString() === user.assigned_truck.toString()) {
    //   user.assigned_truck = null;
    //   await user.save();
    // }
    await truck.remove();
    res.status(200).json({message: 'Truck deleted successfully'});
  } else {
    res.status(400);
    throw new Error('No truck found');
  }
});

// GET
// /api/trucks/:id/assign
exports.assignTruckById = asyncHandler(async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  if (user.assigned_truck) {
    res.status(400);
    throw new Error('You can not assign more than one truck!');
  }

  const truck = await Truck.findOne({_id: id, created_by: user._id});
  if (truck) {
    truck.assigned_to = user._id;
    truck.status = 'IS';

    // user.assigned_truck = truck._id;
    // await user.save();

    await truck.save();
    res.status(200).json({message: 'Truck assigned successfully'});
  } else {
    res.status(400);
    throw new Error('No truck found');
  }
});
