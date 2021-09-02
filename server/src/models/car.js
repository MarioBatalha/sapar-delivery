const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const car = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  owner: { type: String, required: true },
  plate: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  dateRegistration: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Car', car);
