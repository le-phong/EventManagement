const _ = require('lodash');
const moment = require('moment');

const localesUtils = require('../shared/localesUtils');
const appConstant = require('../shared/appConstant');
const eventModel = require('../model/eventModel');

const getEvents = async ({ userId, status, page }) => {
  const now = moment();
  const query = {
    condition: {
      userId,
      dueDate: status === appConstant.EVENT.STATUS.PENDING ? { $gte: now } : { $lt: now },
    },
    sort: {
      dueDate: status === appConstant.EVENT.STATUS.PENDING ? 1 : -1
    },
    skip: (page - 1) * appConstant.EVENT.PAGINATION,
    limit: appConstant.EVENT.PAGINATION
  };
  return eventModel.getEvents(query);
};

const getEvent = async ({ userId, eventId }) => {
  const query = {
    condition: {
      userId,
      id: eventId
    }
  };
  return eventModel.getEvent(query);
};

const createEvent = async (userId, data, lang) => {
  const { name, description, startDate, dueDate } = data;
  if (startDate > dueDate) {
    throw Error(localesUtils.commonMessage(lang).EVENT.DUE_DATE_BEFORE_START_DATE);
  }
  if (dueDate > moment()) {
    throw Error(localesUtils.commonMessage(lang).EVENT.DUE_DATE_HAS_PASSED);
  }
  return eventModel.create({
    userId,
    name,
    description,
    startDate,
    dueDate
  });
};

const updateEvent = async (userId, data, lang) => {
  const { id, startDate, dueDate } = data;
  const event = await eventModel.getEvent({
    condition: {
      userId,
      id
    }
  });
  if (!event) {
    throw Error(localesUtils.commonMessage(lang).EVENT.EVENT_IS_NOT_EXIST);
  }
  if (startDate && (startDate > event.dueDate || startDate > dueDate)) {
    throw Error(localesUtils.commonMessage(lang).EVENT.DUE_DATE_BEFORE_START_DATE);
  }
  const paramUpdate = {};
  _.forEach(['name', 'description', 'startDate', 'dueDate'], value => {
    if (data[value]) {
      paramUpdate[value] = data[value];
    }
  });
  return eventModel.update({
    condition: {
      userId,
      id
    },
    dataUpdate: paramUpdate
  });
};

const removeEvent = async ({ userId, eventId }) => {
  return eventModel.remove({ userId, id: eventId });
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  removeEvent
};
