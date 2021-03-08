/* eslint new-cap: ["error", { "capIsNewExceptionPattern": "^mongoose\.." }] */
const mongoose = require('mongoose');

const truckSchema = mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  type: {
    type: String,
    enum: ['SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT'],
    default: 'SPRINTER',
  },
  status: {
    type: String,
    enum: ['OL', 'IS'],
    default: 'IS',
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
  dimensions: {
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  payload: {
    type: Number,
    required: true,
  },
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
