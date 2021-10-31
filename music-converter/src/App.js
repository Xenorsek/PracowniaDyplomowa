//Import for themes
import { useDarkMode, Toggle } from "./toggle-component/Toggle";
import { darkTheme } from "./toggle-component/darkTheme";
import { lightTheme } from "./toggle-component/lightTheme";
import { GlobalStyles } from "./toggle-component/GlobalStyles";
import { ThemeProvider } from "styled-components";

import NavBar from "./navbar-top/navbar-top-component";
//translate template
import React, { Suspense } from "react";
import { withTranslation } from "react-i18next";
import {
  WelcomeClass,
  LegacyWelcomeClass,
  HelloWorld,
} from "./i18n/translation";

import Upload from '../src/Pages/Upload'
import Library from '../src/Pages/Library'
import Uploads from "./Pages/Uploads";
import Home from "./Pages/Home";
import Favorities
 from "./Pages/Favorities";
 import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const TopNavBar = withTranslation()(NavBar);
function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <Router>
    <ThemeProvider theme={themeMode}>
      <Suspense fallback="loading">
        <GlobalStyles />
        <TopNavBar />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/library' component={Library} />
            <Route path='/upload' component={Upload} />
            <Route path='/uploads' component={Uploads} />
            <Route path='/favorities' component={Favorities} />
          </Switch>
      </Suspense>
    </ThemeProvider>
    </Router>
  );
}

export default App;
