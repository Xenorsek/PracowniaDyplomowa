import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const languageDetector = new LanguageDetector();
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
          Welcome: "Welcome to Music Converter",
          title: "Music Converter",
          HelloWorld: "Hello world",
          Login: "Log in",
          Signup: "Sign in",
          Profil: "Your profile",
          Logout: "Logout",
          pickFile: "Pick File",
          Recorder: "Recorder",
          Home: "Home",
          NavBar: [
            { "Home": "Home page" },
            { "Library": "Library" },
            { "Upload": "Upload" },
            { "Uploads": " Your Uploads" },
            { "Favorites": " Your Favorites" }
          ],
          Login2: [
            { "Signup": "Signup" },
            { "Login": "Login" },
            { "Password": "Password" },
            { "Email": "Email" },
            { "DisplayName": " Display name" },
            { "ResetPassword": "Forgot password?" },
            { "WriteYourEmail": "Write your email adress" },
            {"Done":"Done"},
            {"RecoverPassword":" Recover password"},
          ]
        },
      },
      pl: {
        translation: {
          Welcome: "Witaj w Music Converter",
          title: "Music Converter",
          HelloWorld: "Witaj świecie",
          Login: "Zaloguj",
          Signup: "Zarejestruj",
          Profil: "Twój profil",
          Logout: "Wyloguj",
          pickFile: "Wybierz plik",
          Recorder: "Nagrywarka",
          Home: "Strona domowa",
          NavBar: [
            { "Home": "Strona domowa" },
            { "Library": "Biblioteka" },
            { "Upload": "Konwerter" },
            { "Uploads": "Twoje konwerty" },
            { "Favorites": "Twoje ulubione" }
          ],
          Login2: [
            { "Signup": "Zarejestruj" },
            { "Login": "Zaloguj" },
            { "Password": "Hasło" },
            { "Email": "Email" },
            { "DisplayName": "Widoczna nazwa" },
            { "ResetPassword": "Zapomniałeś hasła?" },
            { "WriteYourEmail": "Podaj swój adres email" },
            {"Done":"Poszło"},
            {"RecoverPassword":"Odzyskaj hasło"},
          ]
        },
      },
    },
    fallbackLng: "en",
    load: "languageOnly",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
