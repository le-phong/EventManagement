const express = require('express');
const router = express.Router();

const resHelper = require('../shared/resHelper');
const appConstant = require('../shared/appConstant');

const userController = require('../controller/userController');
const validate = require('../validate/user');

/**
 * @api {post} /user/login Request login
 * @apiName Login
 * @apiGroup User
 *
 * @apiBody {Object}  { email, password }
 *
 * @apiSuccess {Object} { id, email, username, accessToken, refreshToken }
 */
router.route('/login').post(async (req, res) => {
  try {
    const lang = req.header(appConstant.HEADER.LOCALE) || appConstant.HEADER.DEFAULT_LANGUAGE;
    const body = validate.login(req.body, lang);
    const response = await userController.login(body, lang);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

/**
 * @api {post} /user/register Request register
 * @apiName Register
 * @apiGroup User
 *
 * @apiBody {Object}  { email, username, password }
 *
 * @apiSuccess {Object} { id, email, username }
 */
router.route('/register').post(async (req, res) => {
  try {
    const lang = req.header(appConstant.HEADER.LOCALE) || appConstant.HEADER.DEFAULT_LANGUAGE;
    const body = validate.register(req.body, lang);
    const response = await userController.register(body, lang);
    resHelper.sendResponse(res, response);
  } catch (error) {
    resHelper.sendError(res, error);
  }
});

module.exports = router;
