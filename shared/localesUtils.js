const i18n = require('i18n');

const supportLanguage = ['en', 'vi'];
const ENGLISH = 'en';

function commonMessage(lang = ENGLISH) {
  if (supportLanguage.indexOf(lang) < 0) { lang = ENGLISH; }
  const language = i18n.__({
    phrase: 'COMMON',
    locale: lang,
  });
  return language;
}

function validateMessage(lang = ENGLISH) {
  if (supportLanguage.indexOf(lang) < 0) { lang = ENGLISH; }
  const language = i18n.__({
    phrase: 'VALIDATE',
    locale: lang,
  });
  return language;
}

module.exports = {
  validateMessage,
  commonMessage
};
