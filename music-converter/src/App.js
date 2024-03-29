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

import Upload from "../src/Pages/Upload";
import Library from "../src/Pages/Library";
import Uploads from "./Pages/Uploads";
import Home from "./Pages/Home";
import Login from "./login-component/login";
import Signup from "./signup/Signup";
import Favorites from "./Pages/Favorites";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Profil from "./Pages/Profil";

const TopNavBar = withTranslation()(NavBar);
const UploadComponent = withTranslation()(Upload);
const Home_page = withTranslation()(Home);
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
                <Route exact={true} path="/" component={Home_page} />
                <Route path="/library"><Library theme={theme} /> </Route>

                <Route path="/upload">
              {!user && <Redirect to="/"/>}
              {user && <UploadComponent />}
                </Route>

                <Route path="/uploads" component={Uploads} >
              {!user && <Redirect to="/" />}
              {user && <Uploads theme={theme} />}
                </Route>

                <Route path="/favorites" component={Favorites}>
              {!user && <Redirect to="/" />}
              {user && <Favorites theme={theme} />}
                </Route>
                <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
                </Route>
                <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
                </Route>
                <Route path="/profil">
              {!user && <Redirect to="/" />}
              {user && <Profil />}
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
