const errorMapping = {
  100: 'INVALID_TOKEN'
};
class GeneralErrorHandler {
// eslint-disable-next-line no-unused-vars
  handleError(code, req, res, next) {
    if (code) {
      if (code instanceof Error) {
        res.status(400).send({ code: 400, message: code.message });
      } else if (errorMapping[code]) {
        res.status(401).send({ code, message: errorMapping[code] });
      } else {
        res.status(500).send({ code: 404, message: 'UNHANDLED_ERROR' });
      }
    } else {
      res.status(500).send({ code: 500, message: 'INTERNAL_SERVER_ERROR' });
    }
  }
}

module.exports = new GeneralErrorHandler();
