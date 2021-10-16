import { render } from "@testing-library/react";
import React from "react";
import i18n from "./i18n";


class ChangeLanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          lng: "pl"
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ lng: e.target.value });
        i18n.changeLanguage(e.target.value);
      }
    
    render(){
    return (
      <div className="App">
          <div>
              <select value = {this.state.lng} onChange={this.handleChange}>
                  <option value="pl" >pl</option>
                  <option value="en">en</option>
              </select>
          </div>
      </div>
    );
  }
}
  export default ChangeLanguage;