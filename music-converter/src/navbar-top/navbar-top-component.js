import React from "react";
import ChangeLanguage from "../i18n/changeLanguage";
import Sidenavbar from "../side-nav-bar/Sidenavbar";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Translation } from 'react-i18next';

function withMyHooks(Component) {
  return function WrappedComponent(props) {
    const useLogoutValue = useLogout();
    const useAuthContextValue = useAuthContext();
    return (
      <Component
        {...props}
        useLogoutValue={useLogoutValue}
        useAuthContextValue={useAuthContextValue}
      />
    );
  };
}

class NavBar extends React.Component {
  
  render() {
    const { logout } = this.props.useLogoutValue;
    const { t } = this.props;
    const { user } = this.props.useAuthContextValue;

    return (
      <header className="navbar">
        <div className="navbar__title navbar__item">
          <Sidenavbar />
        </div>
        <Link to={"/"}>
          <div className="navbar__title navbar__item"><Translation>{(t,{i18n})=><span>{i18n.t('title')}</span>}</Translation></div>
        </Link>
        <div className="navbar__item">
          <ChangeLanguage />
        </div>
        {!user && (
          <>
            <div className="navbar__item">
              <Link to={"/login"}>
              <Translation>{(t,{i18n})=><span>{i18n.t('Login')}</span>}</Translation>
              </Link>
            </div>
            <Link to={"/signup"}>
              <div className="navbar__item">
              <Translation>{(t,{i18n})=><span>{i18n.t('Signup')}</span>}</Translation>
              </div>
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to={"/profil"}>
              <div className="navbar__item">{user.displayName}</div>
            </Link>
            <div className="navbar__item" onClick={logout}>
              <span>{t("Logout")}</span>
            </div>
          </>
        )}
      </header>
    );
  }
}
export default withMyHooks(NavBar);
