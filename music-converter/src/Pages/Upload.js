import React from "react";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as mm from "@magenta/music";

//Ikony do nagrywania odtwarzania
//RECORDING ON OFF
//<BsIcons.BsMic />
//<BsIcons.BsMicFill />
//PLAY BUTTON FILL OUTLINE
//<AiIcons.AiFillPlayCircle />
//AiIcons.AiOutlinePlayCircle />
//PAUSE BUTTON FILL OUTLINE
//<AiIcons.AiOutlinePauseCircle />
//AiIcons.AiFillPauseCircle />
//UPLOAD BUTTON
//<RiIcons.RiUploadLine />
//<RiIcons.RiUploadFill />

const inputEl = React.createRef(null);
const hiddenFileInput = React.createRef(null);
const blob = [];
class Upload extends React.Component {
  state = {
    selectedFile: null,
    model: new mm.OnsetsAndFrames(
      "https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni"
    ),
    notes: null,
    viz: null,
    playerViz: null,
    //Recorder
    recorder: null,
    seq: null,
    isRecording: false,
    recordingBroken: false,
    haveData: false,
  };
  handleHaveData = () => {
    this.setState({
      haveData: true,
    });
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
    return (
      <div>

          <div className="record-element">
            <h1>Pick File</h1>
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
            <h1>Recorder</h1>
            <BsIcons.BsMic onClick={this.onClickMic} />
          </div>

          <div className="record-element" style={{textAlign:"center"}}>
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

      </div>
    );
  }
}

export default Upload;
