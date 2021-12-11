import React from "react"
import i18n from "../i18n/i18n"

class Home extends React.Component{
    render(){
        const { t } = this.props;
        return(
            <div className="Home">
            <h1>{t("Home")}</h1>
            <span>{t("Welcome")}</span>
        </div>
        )
    }
}
export default Home