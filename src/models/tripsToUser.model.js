const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tripsToUserSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },

    tripId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Trip',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tripsToUserSchema.plugin(toJSON);
tripsToUserSchema.plugin(paginate);

/**
 * @typedef tripsToUser
 */
const tripsToUser = mongoose.model('tripsToUser', tripsToUserSchema);

module.exports = tripsToUser;
