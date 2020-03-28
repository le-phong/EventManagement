const express = require('express');

const router = express.Router();
const resHelper = require('../shared/resHelper');
const appConstant = require('../shared/appConstant');

const eventController = require('../controller/eventController');
const validate = require('../validate/event');

/**
 * @api {get} /event Request get list event
 * @apiName GetEvents
 * @apiGroup Event
 *
 * @apiHeader {String} token
 * @apiParam {Number}  status
 * @apiParam {Number} page
 *
 * @apiSuccess {Array} [ { id, userId, name, description, startDate, dueDate } ]
 */
router.route('/').get(async (req, res) => {
  try {
    const status = req.query.status || appConstant.EVENT.STATUS.PENDING;
    const page = req.query.page || 1;
    const response = await eventController.getEvents({
      userId: res.locals.userId,
      status: +status || appConstant.EVENT.STATUS.PENDING,
      page: +page || 1
    });
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

/**
 * @api {get} /event/:id Request get event
 * @apiName GetEvent
 * @apiGroup Event
 *
 * @apiHeader {String} token
 * @apiParam {Number} id  // Event id
 *
 * @apiSuccess {*} { id, userId, name, description, startDate, dueDate }
 */
router.route('/:id').get(async (req, res) => {
  try {
    const id = validate.getEvent(req.params.id, res.locals.lang);
    const response = await eventController.getEvent({
      userId: res.locals.userId,
      eventId: id,
      lang: res.locals.lang
    });
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

/**
 * @api {post} /event Request create new event
 * @apiName CreateEvent
 * @apiGroup Event
 *
 * @apiHeader {String} token
 * @apiBody {*}  { name, description, startDate, dueDate }
 *
 * @apiSuccess {*} { id, userId, name, description, startDate, dueDate }
 */
router.route('/').post(async (req, res) => {
  try {
    const body = validate.createEvent(req.body, res.locals.lang);
    const response = await eventController.createEvent({
      userId: res.locals.userId,
      body,
      lang: res.locals.lang
    });
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

/**
 * @api {put} /event Request update event
 * @apiName UpdateEvent
 * @apiGroup Event
 * 
 * @apiHeader {String} token
 * @apiBody {*}  { id, name, description, startDate, dueDate }
 *
 * @apiSuccess {*} { id, userId, name, description, startDate, dueDate }
 */
router.route('/').put(async (req, res) => {
  try {
    const body = validate.updateEvent(req.body, res.locals.lang);
    const response = await eventController.updateEvent({
      userId: res.locals.userId,
      body,
      lang: res.locals.lang
    });
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

/**
 * @api {delete} /event Request delete event
 * @apiName DeleteEvent
 * @apiGroup Event
 *
 * @apiHeader {String} token
 * @apiBody {*}  { id }
 *
 * @apiSuccess {String} { message }
 */
router.route('/').delete(async (req, res) => {
  try {
    const body = validate.removeEvent(req.body, res.locals.lang);
    const response = await eventController.removeEvent({
      userId: res.locals.userId,
      body,
      lang: res.locals.lang
    });
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

module.exports = router;
