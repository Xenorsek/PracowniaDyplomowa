import React, { Component } from "react";
class WelcomeClass extends Component {
    render() {
      const { t } =this.props;
      return <h1>{t('Welcome')}</h1>;
    }
  }
  class LegacyWelcomeClass extends Component {
    render() {
      const { t } = this.props;
      return <h2>{t('title')}</h2>;
    }
  }
  class HelloWorld extends Component {
    render(){
      const {t} = this.props;
      return <h1>{t('Hello World')}</h1>
    }
  }

export {WelcomeClass, LegacyWelcomeClass, HelloWorld};