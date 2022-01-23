import React from "react"
import {List, ListItem} from '@mui/material';
class Home extends React.Component{
    render(){
        const { t } = this.props;
        return(
            <div className="Home">
            <h1>{t("Home")}</h1>
            <span><h3>{t("Welcome")}</h3></span>
            <br></br>
            <span>{t('Introduction.0.ApplicationCourse')}</span>
            <span>
                <List>
                    <ListItem>{t('Introduction.1.LoginOrSignUp')}</ListItem>
                    <ListItem>{t('Introduction.2.NextUpload')}</ListItem>
                    <ListItem>{t('Introduction.3.NameConvert')}</ListItem>
                    <ListItem>{t('Introduction.4.SetAsPublic')}</ListItem>
                    <ListItem>{t('Introduction.5.Gratz')}</ListItem>
                    <ListItem>{t('Introduction.6.Library')}</ListItem>
                    <ListItem>{t('Introduction.7.Favorites')}</ListItem>
                </List>
                </span>
                <span>{t('Introduction.8.HaveFun')}</span>
        </div>
        )
    }
}
export default Home