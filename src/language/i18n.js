import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import translationEN from './lang/en.json';
import translationRU from './lang/ru.json';
import translationUA from './lang/ua.json';

// the translations
const resources = {
  en: {
    translation : translationEN
  },
  ru: {
    translation : translationRU
  },
  ua : {
    translation : translationUA
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ua',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
