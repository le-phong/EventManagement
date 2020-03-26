const moment = require('moment');
const md5 = require('md5');

const userAuthentication = require('../shared/secure/userAuthentication');
const localeUtils = require('../shared/localesUtils');
const appConstant = require('../shared/appConstant');

const userModel = require('../model/userModel');
const accessTokenModel = require('../model/accessTokenModel');
const refreshTokenModel = require('../model/refreshTokenModel');

/**
 * Function handle register user
 * @param {*} { email, username, password }
 * @returns {*} Object user
 */
const register = async (data, lang) => {
  const { email, username, password } = data;
  const checkUser = await userModel.getUser({ condition: { email } });
  if (checkUser) {
    throw Error(localeUtils.commonMessage(lang).EMAIL_IS_EXIST);
  }
  const hashPassword = md5(password);
  const user = await userModel.create({
    email,
    username,
    password: hashPassword
  });
  return user;
};

/**
 * Function handle login user
 * @param {*} { email, password }
 * @returns {*} { email, username, refreshToken, accessToken }
 */
const login = async (data, lang) => {
  const { email, password } = data;
  const user = await userAuthentication.authenticate({ email, password }, lang);

  const accessToken = userAuthentication.generateToken(user, appConstant.JWT.ACCESS_TOKEN_LIFETIME);
  const refreshToken = userAuthentication.generateToken(user, appConstant.JWT.REFRESH_TOKEN_LIFETIME);

  await Promise.all([
    accessTokenModel.save({
      userId: user.id,
      username: user.username,
      email: user.email,
      accessToken,
      expireAt: moment().add(appConstant.JWT.ACCESS_TOKEN_LIFETIME, 'seconds')
    }),
    refreshTokenModel.save({
      userId: user.id,
      refreshToken,
      expireAt: moment().add(appConstant.JWT.REFRESH_TOKEN_LIFETIME, 'seconds')
    })
  ]);
  return { ...user, refreshToken, accessToken };
};

module.exports = {
  register,
  login
};
