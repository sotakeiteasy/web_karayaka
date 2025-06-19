var en = require("./translation.en.json");
var ru = require("./translation.ru.json");

const i18n = {
  translations: {
    en,
    ru,
  },
  defaultLang: "ru",
  languageDataStore : "localStorage" , 
  useBrowserDefault: false,
};

module.exports = i18n;
