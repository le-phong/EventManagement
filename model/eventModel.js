const logger = require('../shared/logger');
const appConstant = require('../shared/appConstant');

const Event = require('./schema/event');

const create = (data) => {
  return new Promise((resolve, reject) => {
    const event = new Event(data);
    event.save(data, (err, data) => {
      if (err) {
        logger.error(`[EventModel.create] Create data error { err: ${err}, data: ${data} }`);
        return reject(err);
      }
      logger.info(`[EventModel.create] Create data success fully Event - { data: ${JSON.stringify(data)}}`);
      return resolve(data);
    });
  });
};

const update = (condition, dataUpdate) => {
  return new Promise((resolve, reject) => {
    Event.updateOne(condition, dataUpdate, (err, data) => {
      if (err) {
        logger.error(`[EventModel.update] Update data error { err: ${err}, data: ${data} }`);
        return reject(err);
      }
      logger.info(`[EventModel.update] Update data success fully Event - { data: ${JSON.stringify(dataUpdate)}}`);
      return resolve(data);
    });
  });
};

const remove = (condition) => {
  return new Promise((resolve, reject) => {
    Event.deleteOne(condition, (err, data) => {
      if (err) {
        logger.error(`[EventModel.remove] Remove data error { err: ${err}, condition: ${condition} }`);
        return reject(err);
      }
      logger.info(`[EventModel.remove] Remove data success fully Event - { condition: ${JSON.stringify(condition)}}`);
      return resolve(data);
    });
  });
};

const getEvent = ({ condition, select }) => {
  return new Promise((resolve, reject) => {
    Event.findOne(condition || {}, select || {}, function (err, data) {
      if (err) {
        logger.error(`[EventModel.getEvent] getEvent data error { err: ${err} }`);
        return reject(err);
      }
      return resolve(data ? data.toJSON() : null);
    });
  });
};

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
          return reject(err);
        }
        return resolve(data);
      });
  });
};

module.exports = {
  create,
  update,
  remove,
  getEvent,
  getEvents
};
