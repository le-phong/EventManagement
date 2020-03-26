const internalToken = require('../middlewares/internalToken');

const eventRouter = require('./event');
const userRouter = require('./user');

class RouterIndex {
  constructor(app) {
    this.app = app;
  }
  registerRoutes() {
    this.app.use('/api/v1/event', internalToken.verifyToken, eventRouter);
    this.app.use('/api/v1/user', userRouter);
  }
}

module.exports = (app) => { return new RouterIndex(app); };
