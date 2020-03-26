module.exports = {
  sendResponse(res, data, status) {
    res.status(status || 200).send(data);
  },

  sendError(res, error) {
    let err = error;
    if (error && error.errors) {
      err = error.errors[0].message;
    } else if (error.message) {
      err = error.message;
    }
    res.status(400).send({
      message: err
    });
  }
};
