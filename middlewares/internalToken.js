const userAuthentication = require('../shared/secure/userAuthentication');
const appConstant = require('../shared/appConstant');

const accessTokenModel = require('../model/accessTokenModel');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header(appConstant.HEADER.TOKEN);
    const lang = req.header(appConstant.HEADER.LOCALE) || appConstant.HEADER.DEFAULT_LANGUAGE;
    if (!token) {
      next(100);
    } else {
      res.locals.token = token;
      res.locals.lang = lang;
      const decodeToken = userAuthentication.verifyToken(token, lang);
      const user = await accessTokenModel.getUserByAccessToken({ userId: decodeToken.uid, token });
      if (!user) {
        next(100);
      } else {
        res.locals.userId = user.userId;
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
