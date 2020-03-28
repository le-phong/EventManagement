const _ = require('lodash');
const moment = require('moment');

const localesUtils = require('../shared/localesUtils');
const appConstant = require('../shared/appConstant');
const eventModel = require('../model/eventModel');

/**
 * Function handle request get list event of user
 * @param {*} { userId, status, page }
 * @returns {Array} Array object event or []
 */
const getEvents = async ({ userId, status, page }) => {
  const query = {
    condition: {
      userId,
      dueDate: status === appConstant.EVENT.STATUS.PENDING ? { $gte: new Date() } : { $lt: new Date() },
    },
    sort: {
      dueDate: status === appConstant.EVENT.STATUS.PENDING ? 1 : -1
    },
    skip: (page - 1) * appConstant.EVENT.PAGINATION,
    limit: appConstant.EVENT.PAGINATION
  };
  return eventModel.getEvents(query);
};

/**
 * Function handle request get event by id
 * @param {*} { userId, eventId, lang }
 * @returns {*} Object event or throw error
 */
const getEvent = async ({ userId, eventId, lang }) => {
  const event = await eventModel.getEvent({
    condition: {
      _id: eventId,
      userId
    }
  });
  if (!event) {
    throw Error(localesUtils.commonMessage(lang).EVENT.EVENT_IS_NOT_EXIST);
  }
  return event;
};

/**
 * Function handle request create event
 * @param {*} { userId, body, lang }
 * @returns {*} Object event or throw error
 */
const createEvent = async ({ userId, body, lang }) => {
  const { name, description, startDate, dueDate } = body;
  if (startDate > dueDate) {
    throw Error(localesUtils.commonMessage(lang).EVENT.DUE_DATE_BEFORE_START_DATE);
  }
  return eventModel.create({
    userId,
    name,
    description,
    startDate,
    dueDate
  });
};

/**
 * Function handler request update event
 * @param {*} { userId, body, lang }
 * @returns {*} Object event
 */
const updateEvent = async ({ userId, body, lang }) => {
  const { id, startDate, dueDate } = body;
  const event = await eventModel.getEvent({ condition: { _id: id, userId } });
  if (!event) {
    throw Error(localesUtils.commonMessage(lang).EVENT.EVENT_IS_NOT_EXIST);
  }
  // Todo check due date can not before start date
  if (moment(startDate || event.startDate).diff(dueDate || event.dueDate, 'minutes') > 0) {
    throw Error(localesUtils.commonMessage(lang).EVENT.DUE_DATE_BEFORE_START_DATE);
  }
  const updateData = {};
  _.forEach(['name', 'description', 'startDate', 'dueDate'], value => {
    if (body[value]) {
      updateData[value] = body[value];
    }
  });
  return eventModel.updateById({
    id,
    updateData
  });
};

/**
 * Function handle request delete an event
 * @param {*} { userId, body, lang }
 */
const removeEvent = async ({ userId, body, lang }) => {
  const isDeleted = await eventModel.remove({ _id: body.id, userId });
  if (!isDeleted) {
    throw Error(localesUtils.commonMessage(lang).EVENT.DELETE_FAILED);
  }
  return {
    message: localesUtils.commonMessage(lang).EVENT.DELETE_SUCCESS
  };
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  removeEvent
};
