import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Element from "./element";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Modal, Button, Box } from "@mui/material";
import * as Tone from "tone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Elements({ sequences, privateCollection, theme }) {
  const { user } = useAuthContext();
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const lightTheme = createTheme({ palette: { mode: "light" } });
  const [musicSequenceForModal, setMusicSequenceForModal] =
    React.useState(null);
  const [keyForModal, setKeyForModal] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (Tone.Transport.state === "started") {
      Tone.Transport.stop();
    }
  };

  const Theme = theme === "light" ? lightTheme : darkTheme;
  const vizTheme =
    theme === "light"
      ? {
          noteRGB: "0, 0, 0",
          activeNoteRGB: "235, 65, 167",
          pixelsPerTimeStep: 40,
        }
      : {
          noteRGB: "50, 219, 134",
          activeNoteRGB: "252, 221, 253",
          pixelsPerTimeStep: 40,
        };

  return (
    <div className="elements">
      <ThemeProvider theme={Theme}>
        {sequences &&
          sequences.map((musicSequence, index) => (
            <Paper key={index * 50 + 1} className="paper" elevation={6}>
              <div className="topElement">
                <h2 className="title">{musicSequence.title}</h2>
                <h5 className="author">By: {musicSequence.name}</h5>
              </div>
              <Button
                key={index * 100 + 1}
                onClick={() => {
                  setKeyForModal(index);
                  setMusicSequenceForModal(musicSequence);
                  handleOpen();
                }}
              >
                Show sequence
              </Button>
            </Paper>
          ))}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              {musicSequenceForModal && (
                <Element
                  key={keyForModal}
                  title={musicSequenceForModal.title}
                  seq={musicSequenceForModal}
                  name={musicSequenceForModal.name}
                  privateCollection={privateCollection}
                  user={user}
                  theme={vizTheme}
                />
              )}
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
export default Elements;
