import {
  darkTheme,
  lightTheme,
  GlobalStyles,
  useDarkMode,
  Toggle,
} from "./toggle-component/Toggle";
import { ThemeProvider } from "styled-components";
import NavbarTop from "./navbar-top/navbar-top-component";
//translate template
import React, { Suspense } from "react";
import { withTranslation } from "react-i18next";

import { WelcomeClass, LegacyWelcomeClass, HelloWorld } from "./i18n/translation"
import ChangeLanguage from "./i18n/changeLanguage";


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
        <div className="App">
          <Helloworld />
          <ChangeLanguage />
        <MyComponent />
        <Welcome />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
