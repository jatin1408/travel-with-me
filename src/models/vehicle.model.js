const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { vehicleTypes } = require('../config/vehicleTypes');

const vehicleSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    vehicleType: {
      type: String,
      enum: [vehicleTypes.FOUR_WHEELER, vehicleTypes.TWO_WHEELER, vehicleTypes.SIX_WHEELER],
    },
    registratioNumber: {
      type: String,
      isRequired: true,
    },
    vehicleName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
vehicleSchema.plugin(toJSON);
vehicleSchema.plugin(paginate);

/**
 * @typedef vehicle
 */
const vehicle = mongoose.model('vehicle', vehicleSchema);

module.exports = vehicle;
