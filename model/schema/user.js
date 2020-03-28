const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
}, { 
  timestamps: true
});

userSchema.indexes({ email: 1 }, { unique: true });
const user = mongoose.model('user', userSchema);
module.exports = user;
