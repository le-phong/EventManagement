const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

class MiddlewareIndex {
  constructor(app) {
    this.app = app;
  }

  configureMiddlewares() {
    // Middlewares
    this.app.use((req, res, next) => {
      if (config.get('whiteList').indexOf('*') < 0) {
        const org = req.get('origin');
        const ip = req.ip.replace('::ffff:', '');
        if (!(_.find(config.get('whiteList'), (o) => {
          return o == org;
        }) || _.find(config.get('whiteList'), (o) => {
          return o == ip;
        }))) {
          next(100);
        }
      }
      next();
    })
      .options('*', cors());
    // show console
    this.app.use(morgan('combined'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors({
      origin: config.get('whiteList'),
      // origin: /\.muv-x\.com$/,
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      // allowedHeaders: [],
      preflightContinue: true
    }));
    // this.app.use(tctTimeAccess.verifyTimeAccess);
  }
}

module.exports = (app) => { return new MiddlewareIndex(app); };
