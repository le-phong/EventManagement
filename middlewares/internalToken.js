const userAuthentication = require('../shared/secure/userAuthentication');
const appConstant = require('../shared/appConstant');

const accessTokenModel = require('../model/accessTokenModel');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header(appConstant.HEADER.TOKEN);
    const lang = req.header(appConstant.HEADER.TOKEN) || appConstant.HEADER.DEFAULT_LANGUAGE;
    if (!token) {
      next(100);
    } else {
      res.locals.token = token;
      res.locals.lang = lang;
      userAuthentication.verifyToken(token, lang);
      const user = await accessTokenModel.getUserByAccessToken(token);
      if (!user) {
        next(100);
      } else {
        req.locals.user = user;
        next();
      }
    }
  } catch (err) {
    next(100);
  }
};

module.exports = {
  verifyToken
};
