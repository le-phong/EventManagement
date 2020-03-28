module.exports = Object.freeze({
  HEADER: {
    TOKEN: 'token',
    LOCALE: 'locale',
    DEFAULT_LANGUAGE: 'en'
  },
  JWT: {
    ACCESS_TOKEN_LIFETIME: 60 * 60 * 12,
    REFRESH_TOKEN_LIFETIME: 60 * 60 * 24 * 30
  },
  EVENT: {
    PAGINATION: 10,
    STATUS: {
      END: 1,
      PENDING: 2
    }
  }
});
