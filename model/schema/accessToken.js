const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema({
  accessToken: String,
  userId: String,
  username: String,
  email: String,
  expireAt: { 
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

accessTokenSchema.indexes({ userId: 1 });
accessTokenSchema.indexes({ expireAt: 1 }, { expireAfterSeconds: 0 });

const accessToken = mongoose.model('access_token', accessTokenSchema);
module.exports = accessToken;
