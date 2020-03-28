const _ = require('lodash');
const joi = require('@hapi/joi');

const localesUtils = require('../shared/localesUtils');

const register = (body, lang) => {
  body = _.pick(body, ['username', 'email', 'password']);
  const result = joi.object().keys({
    username: joi.string().min(3).max(30).required().error(new Error('USERNAME_INVALID')),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error('EMAIL_INVALID')),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('PASSWORD_INVALID'))
  }).validate(body);
  if (result.error) {
    throw Error(localesUtils.validateMessage(lang)[`${result.error.message}`]);
  }
  return body;
};

const login = (body, lang) => {
  body = _.pick(body, ['email', 'password']);
  const result = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error('EMAIL_INVALID')),
    password: joi.string().regex(/^[a-zA-Z0-9]{32}$/).required().error(new Error('PASSWORD_INVALID'))
  }).validate(body);
  if (result.error) {
    throw Error(localesUtils.validateMessage(lang)[`${result.error.message}`]);
  }
  return body;
};

module.exports = {
  register,
  login
};
