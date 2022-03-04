const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { genderTypes } = require('../config/genderTypes');
const tripSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    longitude: {
      type: String,
      required: true,
      private: true, // used by the toJSON plugin
    },
    latitude: {
      type: String,
      required: true,
      private: true, // used by the toJSON plugin
    },
    vechileType: {
      type: Array,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    travelDays: {
      type: Number,
      required: false,
    },
    genderInterested: {
      type: String,
      enum: [genderTypes.MALE, genderTypes.FEMALE, genderTypes.TRANSGENDER],
      required: false,
    },
    isBooked: {
      type: Boolean,
      required: false,
    },
    maxCapacity: {
      type: Number,
      required: false,
    },

    peersGoing: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tripSchema.plugin(toJSON);
tripSchema.plugin(paginate);

tripSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('peersGoing')) {
    if (user.peersGoing.length == user.maxCapacity) {
      user.isBooked = true;
    }
  }
  next();
});

/**
 * @typedef Trip
 */
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
