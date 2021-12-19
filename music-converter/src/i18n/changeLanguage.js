import React from "react";
import i18n from "./i18n";
class ChangeLanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
          lng: "pl"
        };
        i18n.changeLanguage(this.state.lng);
        this.handleChange = this.handleChange.bind(this);
    }
    setState(state){
      window.localStorage.setItem('state', JSON.stringify(state));
      super.setState(state);
    }
    handleChange(e) {
        this.setState({...this.state, lng: e.target.value });
        i18n.changeLanguage(e.target.value);
      }
    render(){
    return (
      <div className="App">
        
          <div>
              <select className="form-select" value = {this.state.lng} onChange={this.handleChange}>
                  <option value="pl" >pl</option>
                  <option value="en">en</option>
              </select>
          </div>
      </div>
    );
  }
}
  export default ChangeLanguage;