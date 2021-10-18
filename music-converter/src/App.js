//Import for themes
import { useDarkMode, Toggle } from "./toggle-component/Toggle";
import { darkTheme } from "./toggle-component/darkTheme";
import { lightTheme } from "./toggle-component/lightTheme";
import { GlobalStyles } from "./toggle-component/GlobalStyles";
import { ThemeProvider } from "styled-components";

import Elements from "./magentajs-component/elements";
import NavbarTop from "./navbar-top/navbar-top-component";
import Element from "./magentajs-component/element";
//translate template
import React, { Suspense } from "react";
import { withTranslation } from "react-i18next";

import {
  WelcomeClass,
  LegacyWelcomeClass,
  HelloWorld,
} from "./i18n/translation";
import ChangeLanguage from "./i18n/changeLanguage";
import MusicConverter from "./magentajs-component/magentajs-component";

const MyComponent = withTranslation()(WelcomeClass);
const Welcome = withTranslation()(LegacyWelcomeClass);
const Helloworld = withTranslation()(HelloWorld);
function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <Suspense fallback="loading">
        <GlobalStyles />

        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <ChangeLanguage />
        <div className="App">
          <Elements />
          <Helloworld />
          <MyComponent />
          <Welcome />
          <MusicConverter />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
