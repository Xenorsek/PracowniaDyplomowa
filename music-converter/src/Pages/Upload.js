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
    user: this.props.useAuthContextValue,
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
    isPlaying: false,

    isTranscripting: false,
    isAdding: false,
    isSendedToDatabaseAlready: false,
  };
  handleHaveData = () => {
    this.setState({
      haveData: true,
    });
  };
  handlePlayButton = (e) => {
    if (this.state.playerViz.isPlaying()) {
      this.state.playerViz.stop()
      this.setState({ isPlaying: false })
    }
    else {
      this.state.playerViz.start(this.state.notes)
      this.setState({ isPlaying: true })
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
        this.setState({isSendedToDatabaseAlready:true})
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
    if (this.state.recordingBroken == false) {
      this.state.recordingBroken = true;
    } else {
      this.state.recordingBroken = false;
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
    this.setState({ isTranscripting: true })
    this.state.model.initialize().then(() => {
      this.state.model.transcribeFromAudioFile(blob[0]).then((ns) => {
        this.setState({
          notes: ns,
          isTranscripting: false,
          isSendedToDatabaseAlready:false,
        });
        this.onClickShowViz();
      });
    });
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.onTranscribe();
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
            isSendedToDatabaseAlready:false
          });
          this.onClickShowViz();
          console.log("end of Transcribing")
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
        this.setState({ isPlaying: false })
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
          {this.state.isRecording && (<BsIcons.BsMicFill onClick={this.onClickMic} />)}
          {!this.state.isRecording && (<BsIcons.BsMic onClick={this.onClickMic} />)}
        </div>

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
            <input type="text" value={this.state.title} name="title" onChange={this.handleChangeTitle}></input>
            {!this.state.isSendedToDatabaseAlready && (
            <button onClick={this.handleSendData}>Send To DataBase</button>
            )}
            {this.state.isSendedToDatabaseAlready && (
            <button disabled>Sended</button>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withMyHooks(Upload);
