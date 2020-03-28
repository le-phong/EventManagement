const logger = require('../shared/logger');
const appConstant = require('../shared/appConstant');

const Event = require('./schema/event');

/**
 * Function create new event
 * @param {*} { data }
 * @returns {*} new event 
 */
const create = (data) => {
  return new Promise((resolve, reject) => {
    const event = new Event(data);
    event.save(data, (err, data) => {
      if (err) {
        logger.error(`[EventModel.create] Create data error { err: ${err}, data: ${data} }`);
        return reject(Error('Invalid'));
      }
      logger.info(`[EventModel.create] Create data success fully Event - { data: ${JSON.stringify(data)}}`);
      return resolve(data);
    });
  });
};

/**
 * Function update event by Id
 * @param {*} { id, updateData }
 * @returns {*} Object event updated 
 */
const updateById = ({ id, updateData }) => {
  return new Promise((resolve, reject) => {
    Event.findByIdAndUpdate(id, updateData, { new: true }, (err, data) => {
      if (err) {
        logger.error(`[EventModel.update] Update data error { err: ${err}, updateData: ${updateData} }`);
        return reject(Error('Invalid'));
      }
      logger.info(`[EventModel.update] Update data success fully Event - { updateData: ${JSON.stringify(updateData)}}`);
      return resolve(data);
    });
  });
};

/**
 * Function delete event
 * @param {*} condition 
 */
const remove = (condition) => {
  return new Promise((resolve, reject) => {
    Event.deleteOne(condition, (err, data) => {
      if (err) {
        logger.error(`[EventModel.remove] Remove data error { err: ${err}, condition: ${condition} }`);
        return reject(Error('Invalid'));
      }
      logger.info(`[EventModel.remove] Remove data success fully Event - { condition: ${JSON.stringify(condition)}}`);
      return resolve(data);
    });
  });
};

/**
 * Function get event
 * @param {*} { condition, select }
 * @returns {*} Event
 */
const getEvent = ({ condition, select }) => {
  return new Promise((resolve, reject) => {
    Event.findOne(condition || {}, select || {}, function (err, data) {
      if (err) {
        logger.error(`[EventModel.getEvent] getEvent data error { err: ${err} }`);
        return reject(Error('Invalid'));
      }
      return resolve(data ? data.toJSON() : null);
    });
  });
};

/**
 * Function get list Event
 * @param {*} { condition, select, sort, skip, limit }
 * @returns {Array} Array object event
 */
const getEvents = ({ condition, select, sort, skip, limit }) => {
  return new Promise((resolve, reject) => {
    Event.find(condition || {})
      .select(select || {})
      .sort(sort || {})
      .skip(skip || 0)
      .limit(limit || appConstant.EVENT.PAGINATION)
      .exec(function (err, data) {
        if (err) {
          logger.error(`[EventModel.getEvents] getEvents data error { err: ${err} }`);
          return reject(Error('Invalid'));
        }
        return resolve(data);
      });
  });
};

module.exports = {
  create,
  updateById,
  remove,
  getEvent,
  getEvents
};
