const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true
});

const event = mongoose.model('event', eventSchema);
module.exports = event;
