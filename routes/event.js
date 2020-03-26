const express = require('express');

const router = express.Router();
const resHelper = require('../shared/resHelper');
const appConstant = require('../shared/appConstant');

const eventController = require('../controller/eventController');

router.route('/').get(async (req, res) => {
  try {
    const status = req.query.status || appConstant.EVENT.STATUS.PENDING;
    const page = req.query.page || 1;
    const response = await eventController.getEvents({ userId: res.locals.user._id, status, page });
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const response = await eventController.getEvent(req.query.id);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const response = await eventController.createEvent(req.body);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

router.route('/').put(async (req, res) => {
  try {
    const response = await eventController.updateEvent(req.body);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

router.route('/').delete(async (req, res) => {
  try {
    const response = await eventController.deleteEvent(req.body);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

module.exports = router;
