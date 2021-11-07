//Import for themes
import { useDarkMode, Toggle } from "./toggle-component/Toggle";
import { darkTheme } from "./toggle-component/darkTheme";
import { lightTheme } from "./toggle-component/lightTheme";
import { GlobalStyles } from "./toggle-component/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { useAuthContext } from "./hooks/useAuthContext";

import NavBar from "./navbar-top/navbar-top-component";
//translate template
import React, { Suspense } from "react";
import { withTranslation } from "react-i18next";
import {
  WelcomeClass,
  LegacyWelcomeClass,
  HelloWorld,
} from "./i18n/translation";

import Upload from "../src/Pages/Upload";
import Library from "../src/Pages/Library";
import Uploads from "./Pages/Uploads";
import Home from "./Pages/Home";
import Login from "./login-component/login";
import Signup from "./signup/Signup";
import Favorities from "./Pages/Favorities";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const TopNavBar = withTranslation()(NavBar);
function App() {
  const { authIsReady, user } = useAuthContext();
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <ThemeProvider theme={themeMode}>
            <Suspense fallback="loading">
              <GlobalStyles />
              <TopNavBar />
              <Toggle theme={theme} toggleTheme={toggleTheme} />
              <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/library" component={Library} />
                <Route path="/upload" component={Upload} />
                <Route path="/uploads" component={Uploads} >
                {!user && <Redirect to="/" />}
                  {user && <Uploads />}
                  </Route>

                <Route path="/favorities" component={Favorities}>
                  {!user && <Redirect to="/" />}
                  {user && <Favorities />}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/" />}
                  {!user && <Login />}
                </Route>
                <Route path="/signup">
                  {user && <Redirect to="/" />}
                  {!user && <Signup />}
                </Route>
              </Switch>
            </Suspense>
          </ThemeProvider>
        </Router>
      )}
    </div>
  );
}

export default App;
