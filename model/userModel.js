const logger = require('../shared/logger');

const User = require('./schema/user');

const create = (data) => {
  return new Promise((resolve, reject) => {
    const user = new User(data);
    user.save(data, (err, data) => {
      if (err) {
        logger.error(`[UserModel.create] Create data error { err: ${err}, data: ${data} }`);
        return reject(Error('Invalid'));
      }
      logger.info(`[UserModel.create] Create data success fully User - { condition: ${JSON.stringify(data)}}`);
      return resolve(data.toJSON());
    });
  });
};

const getUser = ({ condition, select }) => {
  return new Promise((resolve, reject) => {
    User.findOne(condition || {}, select || {}, function (err, data) {
      if (err) {
        logger.error(`[UserModel.getUser] getUser data error { err: ${err} }`);
        return reject(Error('Invalid'));
      }
      return resolve(data ? data.toJSON() : null);
    });
  });
};

module.exports = {
  create,
  getUser
};
