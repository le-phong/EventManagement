const logger = require('../shared/logger');

const AccessToken = require('./schema/accessToken');

const save = (data) => {
  return new Promise((resolve, reject) => {
    const accessToken = new AccessToken(data);
    accessToken.save((err, data) => {
      if (err) {
        logger.error(`[AccessTokenModel.save] Create data error { err: ${err}, data: ${data} }`);
        return reject(Error('Invalid'));
      }
      return resolve(data);
    });
  });
};

/**
 * Function get User by access token
 * @param {*} { userId, token }
 * @returns {*} { userId, email, accessToken, expireAt }
 */
const getUserByAccessToken = ({ userId, token }) => {
  const query = {
    userId,
    accessToken: token,
    expireAt: { $gt: new Date() }
  };
  return new Promise((resolve, reject) => {
    AccessToken.findOne(query, function (err, data) {
      if (err) {
        logger.error(`[AccessTokenModel.getUserByAccessToken] getAccessToken data error { err: ${err} }`);
        return reject(Error('Invalid'));
      }
      return resolve(data);
    });
  });
};

module.exports = {
  save,
  getUserByAccessToken
};
