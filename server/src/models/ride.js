const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ride = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ['A', 'C', 'F'], // ACTIVE, CANCELED, FINISHED,
    default: 'A',
  },
  transactionId: {
    type: String,
    required: true,
  },
  dateRegistration: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Ride', ride);
