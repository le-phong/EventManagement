const express = require('express');
const router = express.Router();

const resHelper = require('../shared/resHelper');
const appConstant = require('../shared/appConstant');

const userController = require('../controller/userController');

router.route('/login').post(async (req, res) => {
  try {
    const lang = req.header(appConstant.HEADER.TOKEN) || appConstant.HEADER.DEFAULT_LANGUAGE;
    const response = await userController.login(req.body, lang);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

router.route('/register').post(async (req, res) => {
  try {
    const lang = req.header(appConstant.HEADER.TOKEN) || appConstant.HEADER.DEFAULT_LANGUAGE;
    const response = await userController.register(req.body, lang);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

module.exports = router;
