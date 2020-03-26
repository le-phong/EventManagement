const logger = require('../shared/logger');

const AccessToken = require('./schema/accessToken');

const save = (data) => {
  return new Promise((resolve, reject) => {
    const accessToken = new AccessToken(data);
    accessToken.save((err, data) => {
      if (err) {
        logger.error(`[AccessTokenModel.save] Create data error { err: ${err}, data: ${data} }`);
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const getUserByAccessToken = ({ condition, select }) => {
  return new Promise((resolve, reject) => {
    AccessToken.findOne(condition || {}, select || {}, function (err, data) {
      if (err) {
        logger.error(`[AccessTokenModel.getUserByAccessToken] getAccessToken data error { err: ${err} }`);
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = {
  save,
  getUserByAccessToken
};
