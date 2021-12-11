import { useAuthContext } from "../hooks/useAuthContext";
import Element from "./element";
import Paper from "@mui/material/Paper"
import { ThemeProvider, createTheme } from '@mui/material/styles';
function Elements({ sequences, privateCollection,theme}) {
  const { user } = useAuthContext();
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });
  const Theme = theme === "light" ? lightTheme : darkTheme;
  const vizTheme = theme ==="light" ?{
    noteRGB: '0, 0, 0',
    activeNoteRGB: '235, 65, 167',
    pixelsPerTimeStep: 40,
  }:{
    noteRGB: '50, 219, 134',
    activeNoteRGB: '252, 221, 253',
    pixelsPerTimeStep: 40,
  };

  return (
    <div className="elements">
      {sequences && sequences.map((musicSequence, index) => (
        <ThemeProvider theme={Theme}>
          <Paper className="paper" elevation={6} >
            <Element key={index} title={musicSequence.title}
              seq={musicSequence}
              name={musicSequence.name} privateCollection={privateCollection} user={user} theme={vizTheme}/>
          </Paper>
        </ThemeProvider>
      ))
      }
    </div>
  )
}
export default Elements;