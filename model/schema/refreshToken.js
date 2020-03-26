const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: String,
  userId: String,
  expireAt: { 
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

refreshTokenSchema.indexes({ userId: 1 });
refreshTokenSchema.indexes({ expireAt: 1 }, { expireAfterSeconds: 0 });

const refreshToken = mongoose.model('refresh_token', refreshTokenSchema);
module.exports = refreshToken;
