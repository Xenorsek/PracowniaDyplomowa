import React from "react";
import i18n from "./i18n";
function ChangeLanguage() {
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  
    return (
      <div className="App">
        <div className="App-header">
          <button type="button" onClick={() => changeLanguage('pl')}>
            pl
          </button>
          <button type="button" onClick={() => changeLanguage('en')}>
            en
          </button>
        </div>
      </div>
    );
  }
  export default ChangeLanguage;