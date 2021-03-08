const asyncHandler = require('express-async-handler');
const Load = require('../models/loadModel');
const Truck = require('../models/truckModel');

// POST
// /api/loads
exports.createLoad = asyncHandler(async (req, res) => {
  const user = req.user;
  await Load.create({
    ...req.body,
    created_by: user.id,
  });

  res.status(200).json({message: 'Load created successfully'});
});

// GET
// /api/loads
exports.getLoads = asyncHandler(async (req, res) => {
  const user = req.user;
  const keyword = req.query.filter ?
    {
      name: {
        $regex: req.query.filter,
        $options: 'i',
      },
    }: {};

  let loads;
  if (user.role === 'DRIVER') {
    loads = await Load.find({assigned_to: user._id, ...keyword});
  } else {
    loads = await Load.find({created_by: user._id, ...keyword});
  }

  if (loads) {
    res.status(200).json({loads});
  } else {
    res.status(400);
    throw new Error('No loads found');
  }
});

// Driver only
// GET
// /api/loads/active
exports.getActiveLoads = asyncHandler(async (req, res) => {
  const user = req.user;

  const load = await Load.findOne({assigned_to: user._id, status: 'ASSIGNED'});

  if (load) {
    res.status(200).json({load});
  } else {
    res.status(400);
    throw new Error('No load found');
  }
});

// Driver only
// PATCH
// /api/loads/active/state
exports.nextState = asyncHandler(async (req, res) => {
  const user = req.user;
  const states = Load.schema.path('state').enumValues;
  const load = await Load.findOne({assigned_to: user._id});

  if (load) {
    let message;

    switch (load.state) {
      case states[0]:
        message = states[1];
        break;
      case states[1]:
        message = states[2];
        break;
      case states[2]:
        message = states[3];
        load.status = 'SHIPPED';
        break;
    }

    load.state = message;
    await load.save();
    res.status(200).json({message: `Load state changed to ${message}`});
  } else {
    res.status(400);
    throw new Error('No load found in nextState');
  }
});

// GET
// /api/loads/:id
exports.getLoadById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const load = await Load.findById(id);

  if (load) {
    res.status(200).json({load});
  } else {
    res.status(400);
    throw new Error('No load found');
  }
});

// PUT
// /api/loads/:id
exports.updateById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const load = await Load
      .findOneAndUpdate({_id: id, status: {$ne: 'NEW'}}, req.body, {new: true});
  if (load) {
    res.status(200).json({message: 'Load details changed successfully'});
  } else {
    res.status(400);
    throw new Error('Failed to update');
  }
});

// SHIPPER
// DELETE
// /api/loads/:id
exports.deleteById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const load = await Load.findById(id);
  if (load && load.status === 'NEW') {
    await load.remove();
    res.status(200).json({message: 'Load deleted successfully'});
  } else {
    res.status(400);
    throw new Error('Failed to delete');
  }
});

// SHIPPER
// POST
// /api/loads/:id/post
exports.postLoad = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const load = await Load.findById(id);

  if (load) {
    const {dimensions: {height, width, length}, payload} = load;

    const matchedTruck = await Truck.findOne()
        .where('status').equals('IS')
        .where('payload').gt(payload)
        .where('dimensions.height').gt(height)
        .where('dimensions.width').gt(width)
        .where('dimensions.length').gt(length);

    if (matchedTruck) {
      matchedTruck.status = 'OL';
      load.status = 'ASSIGNED';
      load.assigned_to = matchedTruck.created_by;
      load.state = 'En route to Pick Up';
      load.truck = matchedTruck._id;
      load.logs = [
        ...load.logs,
        {
          message: `Load assigned to driver with id ${matchedTruck.created_by}`,
        },
      ];

      await matchedTruck.save();
      await load.save();
      res.status(200)
          .json({message: 'Load posted successfully', driver_found: true});
    } else {
      load.logs = [...load.logs, {message: `Could't not find driver`}];
      await load.save();
      res.status(400);
      throw new Error('No Available Driver Found');
    }
  } else {
    res.status(400);
    throw new Error('No Load Found');
  }
});

// SHIPPER
// GET
// /api/loads/:id/shipping_info
exports.getShippinInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const load = await Load.findById(id).populate('truck');
  if (load) {
    res.status(200).json({load});
  } else {
    res.status(400);
    throw new Error('Failed to update');
  }
});
