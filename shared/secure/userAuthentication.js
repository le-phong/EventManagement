const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');

const localesUtil = require('../../shared/localesUtils');
const userModel = require('../../model/userModel');

const authenticate = async ({ email, password }, lang) => {
  const user = await userModel.getUser({ condition: { email } });
  if (user) {
    if (password !== user.password) {
      throw Error(localesUtil.commonMessage(lang).PASSWORD_INCORRECT);
    }
    user.id = user._id;
    return _.omit(user, ['_id', 'password']);
  } else {
    throw Error(localesUtil.commonMessage(lang).EMAIL_IS_NOT_EXIST);
  }
};

const generateToken = (user, expireTime) => {
  const now = moment().unix();
  const infoUser = _.pick(user, ['email', 'id']);
  const payload = {
    iat: now,
    exp: now + expireTime,
    uid: user.id,
    claims: {
      infoUser
    }
  };
  return jwt.sign(payload, config.jwt.key);
};

const verifyToken = (token, lang) => {
  const decodedToken = jwt.decode(token);
  if (!decodedToken || decodedToken.exp < moment().unix()) {
    throw new Error(localesUtil.commonMessage(lang).INVALID_TOKEN);
  }
  return decodedToken;
};


module.exports = {
  authenticate,
  generateToken,
  verifyToken
};
