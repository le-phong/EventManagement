const _ = require('lodash');
const joi = require('@hapi/joi');

const localesUtils = require('../shared/localesUtils');

const createEvent = (body, lang) => {
  body = _.pick(body, ['name', 'description', 'startDate', 'dueDate']);
  const result = joi.object().keys({
    name: joi.string().min(1).max(1000).error(new Error('EVENT_NAME_INVALID')),
    description: joi.string().error(new Error('EVENT_DESCRIPTION_INVALID')),
    startDate: joi.string().pattern(new RegExp('^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]Z$')).required().error(new Error('START_DATE_INVALID')),
    dueDate: joi.string().pattern(new RegExp('^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]Z$')).required().error(new Error('DUE_DATE_INVALID'))
  }).validate(body);
  if (result.error) {
    throw Error(localesUtils.validateMessage(lang)[`${result.error.message}`]);
  }
  return body;
};

const updateEvent = (body, lang) => {
  body = _.pick(body, ['id', 'name', 'description', 'startDate', 'dueDate']);
  const result = joi.object().keys({
    id: joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).error(new Error('ID_INVALID')),
    name: joi.string().min(1).max(1000).error(new Error('EVENT_NAME_INVALID')),
    description: joi.string().error(new Error('EVENT_DESCRIPTION_INVALID')),
    startDate: joi.string().pattern(new RegExp('^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]Z$')).error(new Error('START_DATE_INVALID')),
    dueDate: joi.string().pattern(new RegExp('^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]Z$')).error(new Error('DUE_DATE_INVALID'))
  }).validate(body);
  if (result.error) {
    throw Error(localesUtils.validateMessage(lang)[`${result.error.message}`]);
  }
  return body;
};

const getEvent = (id, lang) => {
  const result = joi.object().keys({
    id: joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).error(new Error('ID_INVALID'))
  }).validate({ id });
  if (result.error) {
    throw Error(localesUtils.validateMessage(lang)[`${result.error.message}`]);
  }
  return id;
};
  
const removeEvent = (body, lang) => {
  const result = joi.object().keys({
    id: joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).error(new Error('ID_INVALID'))
  }).validate(body);
  if (result.error) {
    throw Error(localesUtils.validateMessage(lang)[`${result.error.message}`]);
  }
  return body;
};

module.exports = {
  createEvent,
  updateEvent,
  getEvent,
  removeEvent
};
