const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payment = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      price: Number,
      dateRegistration: {
        type: Date,
        default: Date.now(),
      },

});

module.exports = mongoose.model('Payment', payment);
