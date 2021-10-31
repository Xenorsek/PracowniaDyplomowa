//Import for themes
import { useDarkMode, Toggle } from "./toggle-component/Toggle";
import { darkTheme } from "./toggle-component/darkTheme";
import { lightTheme } from "./toggle-component/lightTheme";
import { GlobalStyles } from "./toggle-component/GlobalStyles";
import { ThemeProvider } from "styled-components";

import NavBar from "./navbar-top/navbar-top-component";
import Elements from "./magentajs-component/elements";
//translate template
import React, { Suspense } from "react";
import { withTranslation } from "react-i18next";
import {
  WelcomeClass,
  LegacyWelcomeClass,
  HelloWorld,
} from "./i18n/translation";
import MusicConverter from "./magentajs-component/magentajs-component";

const MyComponent = withTranslation()(WelcomeClass);
const Welcome = withTranslation()(LegacyWelcomeClass);
const Helloworld = withTranslation()(HelloWorld);
const TopNavBar = withTranslation()(NavBar); 
function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <Suspense fallback="loading">
        <GlobalStyles />
        <TopNavBar  />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <div className="App">
          {/* <Elements />
          <Helloworld />
          <MyComponent />
          */}
          <MyComponent/>
          <MusicConverter />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
