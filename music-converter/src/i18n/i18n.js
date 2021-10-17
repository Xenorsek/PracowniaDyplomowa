import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Welcome": "Welcome to Music Converter",
          "title":"Music Converter",
          "Hello World": "Hello world"
        }
      },
      pl:{
        translation: {
          "Welcome" :"Witaj w Music Converter",
          "title":"Music Converter",
          "Hello World": "Witaj świecie"
        }
      },

    },
    fallbackLng: "pl",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });


export default i18n;