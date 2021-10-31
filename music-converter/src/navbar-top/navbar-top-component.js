import React from "react";
import ChangeLanguage from "../i18n/changeLanguage";
class NavBar extends React.Component {
  showSettings (event) {

    event.preventDefault();
  }
  render() {

    const {t} = this.props;
    return (
      <header className="navbar">

        <div className="navbar__title navbar__item">{t('title')}</div>
        <div className="navbar__item"><ChangeLanguage/></div>
        <div className="navbar__item">{t('Login')}</div>
        <div className="navbar__item">{t('Signin')}</div>
        <div className="navbar__item">{t('Profil')}</div>
      </header>
    );
  }
}
export default NavBar;
