import LocaleSwitcher from "./localeSwitcher";
import { darkTheme, lightTheme, GlobalStyles, useDarkMode, Toggle }from "./toggle-component/Toggle"
import { ThemeProvider } from 'styled-components';

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Toggle theme={theme} toggleTheme={toggleTheme} />
    <div className="App">
      <h1>Hello World</h1>
      <LocaleSwitcher />
    </div>
    </ThemeProvider>
  );
}

export default App;
