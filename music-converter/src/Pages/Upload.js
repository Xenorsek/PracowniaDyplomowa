import React from "react";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

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
    user : this.props.useAuthContextValue,
    title: "Type title here",
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
  };
  handleHaveData = () => {
    this.setState({
      haveData: true,
    });
  };
  handleSendData = async (e) => {
    e.preventDefault();
    var {user} = this.state.user;
    var name = "";
    if(!user){
     name = "Annonymous";
    }
    else{
      name = user.displayName
    }
    var notes = [];
    this.state.notes.notes.forEach((element) => {
      const pitch = element.pitch;
      const startTime = element.startTime;
      const endTime = element.endTime;
      const velocity = element.velocity;

      notes.push({ pitch, startTime, endTime, velocity });
    });
    const tempos = this.state.notes.tempos;
    const title = this.state.title;
    const totalTime = this.state.notes.totalTime;
    const author = user.uid;
    const doc = { name, notes, tempos, title, totalTime, author };

    try {
      await projectFirestore.collection("musicSequences").add(doc).then(()=>{
        console.log("Document successfully added!");
    }).catch((error) => {
        console.error("Error with added document: ", error);
    });
    } catch (err) {
      console.log(err);
    }
  };
  handleAddFile = () => {
    hiddenFileInput.current.click();
  };
  setIsRecord = () => {
    this.state.isRecording = !this.state.isRecording;
  };

  setRecordingBroken = () => {
    if (this.state.recordingBroken == false) {
      this.state.recordingBroken = true;
    } else {
      this.state.recordingBroken = false;
    }
  };

  onClickMic = () => {
    this.state.isRecording
      ? this.onStopRecordButtonClick()
      : this.onStartRecordButtonClick();
  };

  onStartRecordButtonClick = () => {
    blob.pop();
    if (this.state.isRecording) {
      this.setIsRecord();
      this.state.recorder.stop();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.setIsRecord();
        this.state.recorder = new MediaRecorder(stream);
        this.state.recorder.start();
        console.log(this.state.recorder.state);
      });
    }
  };

  onStopRecordButtonClick = () => {
    this.state.recorder.stop();
    //przechowywanie danych w blob
    this.state.recorder.ondataavailable = (e) => blob.push(e.data);
    console.log(this.state.recorder.state);
    this.setIsRecord();
    this.onClickTrascriptFromMic();
  };

  onClickTrascriptFromMic = () => {
    this.state.model.initialize().then(() => {
      this.state.model.transcribeFromAudioFile(blob[0]).then((ns) => {
        this.setState({
          notes: ns,
        });
        this.onClickShowViz();
      });
    });
  };

  handleChangeTitle = (event) =>{
    this.setState({title: event.target.value})
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.onTranscribe();
  };

  onTranscribe = () => {
    this.state.model.initialize().then(() => {
      this.state.model
        .transcribeFromAudioFile(this.state.selectedFile)
        .then((ns) => {
          this.setState({
            notes: ns,
          });
          this.onClickShowViz();
        });
    });
  };
  onClickShowViz = () => {
    this.state.viz = new mm.PianoRollCanvasVisualizer(
      this.state.notes,
      inputEl.current
    );
    this.state.playerViz = new mm.Player(false, {
      run: (note) => this.state.viz.redraw(note),
      stop: () => {
        console.log("done");
      },
    });
    this.handleHaveData();
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="record-element">
          <h1>{t("pickFile")}</h1>
          <RiIcons.RiUploadLine onClick={this.handleAddFile} />
          <input
            type="file"
            onChange={this.onFileChange}
            id="fileInput"
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>

        <div className="record-element">
          <h1>{t("Recorder")}</h1>
          <BsIcons.BsMic onClick={this.onClickMic} />
        </div>

        <div className="record-element" style={{ textAlign: "center" }}>
          {this.state.haveData && (
            <AiIcons.AiOutlinePlayCircle
              onClick={() => {
                this.state.playerViz.isPlaying()
                  ? this.state.playerViz.stop()
                  : this.state.playerViz.start(this.state.notes);
              }}
            />
          )}
          <canvas ref={inputEl} />
        </div>
        {this.state.notes && (
          <>
          <input type="text" value={this.state.title} name="title" onChange={this.handleChangeTitle}></input>
          <button onClick={this.handleSendData}>Send To DataBase</button>
          </>
        )}
      </div>
    );
  }
}

export default withMyHooks(Upload);
