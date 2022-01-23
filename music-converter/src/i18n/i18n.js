import i18n from "i18next";
import { initReactI18next } from "react-i18next";
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
          Welcome: "Welcome to Sound Converter",
          title: "Sound Converter",
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
          Introduction:[
            {"ApplicationCourse":"Application Course:"},
            {"LoginOrSignUp":" At first you should sign up or sign in."},
            {"NextUpload":"Next use menu button in top left corner and select Upload."},
            {"NameConvert":"Try create something, you can use your own microphone or use other music file."},
            {"SetAsPublic":"In page Your uploads you can check your files, set is as public or remove it."},
            {"Gratz":"After you set it as public you can check them in Library."},
            {"Library":"In Library you can listen other files from other users. If you like them let them know giving them a heart."},
            {"Favorites":"In Favorites you can find them easily."},
            {"HaveFun":"Hope you have fun!"}
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
          ],
          UpToDate:"You are up date",
          LoadMore:"Load more"
        },
      },
      pl: {
        translation: {
          Welcome: "Witaj w Sound Converter",
          title: "Sound Converter",
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
          Introduction:[
            {"ApplicationCourse":"Przebieg aplikacji:"},
            {"LoginOrSignUp":"W pierwszej kolejności załóż konto lub się zaloguj."},
            {"NextUpload":"Następnie przejdź do upload/konwerter by móc skorzystać z upload'u z pliku bądź z dyktafonu."},
            {"NameConvert":"Jak uda ci się stworzyć plik zapisz go podając jakiś chwytliwy tytuł."},
            {"SetAsPublic":"Następnie by podzielić się nim ze światem upublicznij go w zakładce Twoje konwerty/Your uploads"},
            {"Gratz":"Gratulacje, teraz mogą ją zobaczyć wszyscy w bibliotece."},
            {"Library":"W bibliotece możesz przesłuchać utworów innych oraz zapisać je do ulubionych klikając serduszko."},
            {"Favorites":"W zakładce ulubione, możesz przeglądać pulubione utwory."},
            {"HaveFun":"Baw się dobrze :D"}
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
          ],
          UpToDate:"Jesteś na bierząco",
          LoadMore:"Załaduj więcej",
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
