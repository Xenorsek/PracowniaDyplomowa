import React from "react"

class Home extends React.Component{
    render(){
        const { t } = this.props;
        return(
            <div className="Home">
            <h1>{t("Home")}</h1>
            <span>{t("Welcome")}</span>
            <span> Przebieg aplikacji:</span>
                <ul>
                    <li>W pierwszej kolejności załóż konto lub się zaloguj.</li>
                    <li>Następnie przejdź do upload/konwerter by móc skorzystać z upload'u z pliku bądź z dyktafonu.</li>
                    <li>Jak uda ci się stworzyć plik zapisz go podając jakiś chwytliwy tytuł.</li>
                    <li>Następnie by podzielić się nim ze światem upublicznij go w zakładce Twoje konwerty/Your uploads</li>
                    <li>Gratulacje, teraz mogą zobaczyć je wszyscy w bibliotece.</li>
                    <li>W bibliotece możesz przesłuchać utworów innych oraz zapisać je do ulubionych klikając serduszko.</li>
                    <li> Liczba koło serduszek znaczy ile osób je polubiło.</li>
                </ul>
                <span>Baw się dobrze!</span>
        </div>
        )
    }
}
export default Home