const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  fbId: { type: String },
  name: { type: String },
  phone: { type: String, required: true},
  password: { type: Number, required: true},
  typeUser: {
    type: String,
    enum: ['D', 'P'],
    required: true,
  },
  accessToken: {
     type: String,
     required: true 
    },
  location: {
    type: { type: String },
    coordinates: [],
  },
  socketId: String,
  dateRegister: {
    type: Date,
    default: Date.now(),
  },
});

user.index({ location: '2dsphere' });

module.exports = mongoose.model('User', user);
