/* eslint-disable no-undef */
const express = require('express');
const app = express();
const helmet = require('helmet');
const config = require('config');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const i18n = require('i18n');
const logger = require('./shared/logger');

// Use helmet
app.use(helmet());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// configure middlewares
const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();

// configure routers
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();

// error
const generalErrorHandler = require('./shared/generalErrorHandler');
app.use(generalErrorHandler.handleError);

// I18n
i18n.configure({
  locales: ['en', 'vi'],
  directory: `${__dirname}/config/locales`
});


// Mongodb
// Connect to Mongoose and set connection variable
const mongoConfig = config.get('mongodb');
mongoose.connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
  {
    user: mongoConfig.user,
    pass: mongoConfig.pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
const db = mongoose.connection;

// Added check for DB connection
if (!db) {
  logger.error('Error connecting db');
} else {
  logger.info('Db connected successfully');
}

// port
const port = config.get('port') || 8080;

http.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}/`);
});

module.exports = app;
