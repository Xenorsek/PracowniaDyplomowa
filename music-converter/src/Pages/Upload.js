import React from "react";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import * as mm from "@magenta/music";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

function withMyHooks(Component) {
  return function WrappedComponent(props) {
    const useAuthContextValue = useAuthContext();
    return (
      <Component
        {...props}
        useAuthContextValue={useAuthContextValue}
      />
    );
  };
}

const inputEl = React.createRef(null);
const hiddenFileInput = React.createRef(null);
const blob = [];
class Upload extends React.Component {
  state = {
    user: this.props.useAuthContextValue,
    title: "Title",
    selectedFile: null,
    model: new mm.OnsetsAndFrames(
      "https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni"
    ),
    notes: null,
    viz: null,
    playerViz: null,
    //Recorder
    recorder: null,
    isRecording: false,
    recordingBroken: false,
    haveData: false,
    isPlaying: false,

    isTranscripting: false,
    isAdding: false,
    isSentToDatabaseAlready: false,
    timer: 0,
    maxLength: 30,
    error: null,
  };
  handleHaveData = () => {
    this.setState({
      haveData: true,
    });
  };
  handlePlayButton = (e) => {
    if (this.state.isTranscripting || !this.state.haveData) {
      console.log("You can't do that")
    }
    else {
      if (this.state.playerViz.isPlaying()) {
        this.state.playerViz.stop()
        this.setState({ isPlaying: false })
      }
      else {
        this.state.playerViz.start(this.state.notes)
        this.setState({ isPlaying: true })
      }
    }
  }


  handleSendData = async (e) => {

    e.preventDefault();
    var { user } = this.state.user;
    var name = "";
    var author = "";
    if (!user) {
      name = "Annonymous";
    }
    else {
      name = user.displayName
      author = user.uid;
    }
    var notes = [];
    this.state.notes.notes.forEach((element) => {
      const pitch = element.pitch;
      const startTime = element.startTime;
      const endTime = element.endTime;
      const velocity = element.velocity;
      notes.push({ pitch, startTime, endTime, velocity });
    });
    const publicStatus = false;
    const tempos = this.state.notes.tempos;
    const title = this.state.title;
    const totalTime = this.state.notes.totalTime;
    const date = new Date();
    const doc = { name, notes, tempos, title, totalTime, author, publicStatus, date };

    try {
      await projectFirestore.collection("musicSequences").add(doc).then((docRef) => {
        docRef.update({
          id: docRef.id
        })
        console.log("Document successfully added!");
        this.setState({ isSentToDatabaseAlready: true })
      }).catch((error) => {
        console.error("Error with added document: ", error);
      });
    } catch (err) {
      console.log(err);
    }
  };
  handleAddFile = () => {
    if (!this.state.isTranscripting && !this.state.isRecording) {
      hiddenFileInput.current.click();
    }
    if (this.state.isRecording) {
      console.log("Jesteś w trakcie nagrywania")
    }
  };
  setIsRecord = () => {
    this.setState({ isRecording: !this.state.isRecording })
    //this.state.isRecording = !this.state.isRecording;
  };

  setRecordingBroken = () => {
    if (this.state.recordingBroken === false) {
      this.setState({ recordingBroken: true });
    } else {
      this.setState({ recordingBroken: false });
    }
  };

  onClickMic = () => {
    if (!this.state.isTranscripting) {
      this.state.isRecording
        ? this.onStopRecordButtonClick()
        : this.onStartRecordButtonClick();
    }
  };

  onStartRecordButtonClick = () => {
    this.setState({error:null})
    blob.pop();
    if (this.state.isRecording) {
      this.setIsRecord();
      this.state.recorder.stop();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.setIsRecord();
        this.setState({ recorder: new MediaRecorder(stream) });
        this.state.recorder.start();
        console.log(this.state.recorder.state);
        this.setState({ timer: setTimeout(this.afterMaxLengthTimer, this.state.maxLength * 1000) })
      });
    }
  };

  afterMaxLengthTimer = () => {
    if (this.state.recorder.state === 'recording') {
      this.state.recorder.stop();
      //przechowywanie danych w blob
      this.state.recorder.ondataavailable = (e) => blob.push(e.data);
      console.log(this.state.recorder.state);
      this.setIsRecord();
      this.onClickTrascriptFromMic();
    }
  }

  onStopRecordButtonClick = () => {
    this.state.recorder.stop();
    //przechowywanie danych w blob
    this.state.recorder.ondataavailable = (e) => blob.push(e.data);
    console.log(this.state.recorder.state);
    this.setIsRecord();
    this.onClickTrascriptFromMic();
  };

  onClickTrascriptFromMic = () => {
    this.setState({ isTranscripting: true })
    this.state.model.initialize().then(() => {
      this.state.model.transcribeFromAudioFile(blob[0]).then((ns) => {
        this.setState({
          notes: ns,
          isTranscripting: false,
          isSentToDatabaseAlready: false,
        });
        this.onClickShowViz();
      });
    });
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  onFileChange = (event) => {
    this.setState({error:null})
    if(event.target.files[0].type.includes("audio") || event.target.files[0].type.includes("mp3") || event.target.files[0].type.includes("music")){
      this.setState({ selectedFile: event.target.files[0] });
      this.onTranscribe();
    }
else{
  let type = event.target.files[0].type;
  this.setState({error:"the file format "+type+" is not supported"})
}

  };

  onTranscribe = () => {
    this.setState({ isTranscripting: true })
    console.log("isTranscribing");
    this.state.model.initialize().then(() => {
      this.state.model
        .transcribeFromAudioFile(this.state.selectedFile)
        .then((ns) => {
          this.setState({
            notes: ns,
            isTranscripting: false,
            isSentToDatabaseAlready: false
          });
          this.onClickShowViz();
          console.log("end of Transcribing")
        });
    });
  };
  onClickShowViz = () => {
    this.setState({
      viz: new mm.PianoRollCanvasVisualizer(
        this.state.notes,
        inputEl.current, {
        noteRGB: '0, 0, 0',
        activeNoteRGB: '235, 65, 167',
        pixelsPerTimeStep: 40,
      }
      ),
      playerViz: new mm.Player(false, {
        run: (note) => this.state.viz.redraw(note),
        stop: () => {
          console.log("done");
          this.setState({ isPlaying: false })
        },
      })
    })
    this.handleHaveData();
  };
  render() {
    const { t } = this.props;
    return (
      <div className="upload">
        <div className="record-element">
          <h1>{t("pickFile")}</h1>
          <div className="Recorder">
            <RiIcons.RiUploadLine className="HeartIcon" onClick={this.handleAddFile} />
            <input
              type="file"
              onChange={this.onFileChange}
              id="fileInput"
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="record-element">
          <h1>{t("Recorder")}</h1>
          <div className="Recorder">
            {this.state.isRecording && (<BsIcons.BsMicFill className="HeartIcon" onClick={this.onClickMic} />)}
            {!this.state.isRecording && (<BsIcons.BsMic className="HeartIcon" onClick={this.onClickMic} />)}
          </div>
          <h6>Max {this.state.maxLength} seconds</h6>
        </div>
        {this.state.error && this.state.error}
        <div className="record-element" style={{ textAlign: "center" }}>
          {this.state.haveData && (
            <div onClick={this.handlePlayButton}>
              {this.state.isPlaying && (<BsIcons.BsPauseCircleFill />)}
              {!this.state.isPlaying && (<BsIcons.BsFillPlayCircleFill />)}
            </div>
          )}
          {this.state.isTranscripting && (<div>isTranscripting...</div>)}
          <canvas onClick={this.handlePlayButton} className="musicSequence" ref={inputEl} />
        </div>
        {this.state.notes && (
          <>
          <form className="addUpload">
            <TextField type="text" className="addUpload-element" color="secondary" value={this.state.title} label="title" onChange={this.handleChangeTitle}></TextField>
            {!this.state.isSentToDatabaseAlready && (
              <Button color="secondary" className="addUpload-element" variant="outlined" onClick={this.handleSendData}>Send To DataBase</Button>
            )}
            {this.state.isSentToDatabaseAlready && (
              <Button color="secondary" className="addUpload-element" variant="outlined" disabled>Sent</Button>
            )}
            </form>
            <Button color="primary" className="show-music-xml" variant="outlined">Show Xml</Button>
          </>
        )}
      </div>
    );
  }
}

export default withMyHooks(Upload);
