const logger = require('../shared/logger');

const RefreshToken = require('./schema/refreshToken');

const save = (data) => {
  return new Promise((resolve, reject) => {
    const refreshToken = new RefreshToken(data);
    refreshToken.save({ upsert: true }, (err, data) => {
      if (err) {
        logger.error(`[RefreshTokenModel.save] Create data error { err: ${err}, data: ${data} }`);
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = {
  save
};
