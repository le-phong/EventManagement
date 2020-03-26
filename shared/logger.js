const path = require('path');
const winston = require('winston');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

const options = {
  infoFile: {
    level: 'info',
    name: 'file.info',
    // eslint-disable-next-line no-undef
    filename: path.resolve(__dirname, '../..', 'logs', '%DATE%-event_management.log'),
    handleExceptions: true,
    json: true,
    colorize: true,
    datePattern: 'YYYY-MM-DD-HH',
    // maxSize: '50m',
    maxsize: 5242880,
    maxFiles: '14d'
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `[${info.timestamp}] [${info.level}]: ${
        typeof info.message === 'object' ? JSON.stringify(info.message) : info.message
      }`;
    })
  ),
  transports: [
    new (winston.transports.Console)(options.console),
    new (winston.transports.DailyRotateFile)(options.infoFile)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
