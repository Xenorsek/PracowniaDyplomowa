import React, { Component } from "react";
class WelcomeClass extends Component {
    render() {
      const { t } =this.props;
      return <h1>{t('Welcome to React')}</h1>;
    }
  }
  class LegacyWelcomeClass extends Component {
    render() {
      const { t } = this.props;
      return <h2>{t('title')}</h2>;
    }
  }

export {WelcomeClass, LegacyWelcomeClass};