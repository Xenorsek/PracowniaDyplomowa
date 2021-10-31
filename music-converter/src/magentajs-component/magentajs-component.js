import React from "react";

import * as mm from "@magenta/music";

const inputEl = React.createRef(null);
const blob = []; 

class MusicConverter extends React.Component {
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
  };

  setIsRecord = () => {
    if (this.state.isRecording == false) {
      this.state.isRecording = true;
    } else {
      this.state.isRecording = false;
    }
  };

  setRecordingBroken = () => {
    if (this.state.recordingBroken == false) {
      this.state.recordingBroken = true;
    } else {
      this.state.recordingBroken = false;
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
    this.state.recorder.ondataavailable = e => blob.push(e.data);
    console.log(this.state.recorder.state);

    this.setIsRecord();

  };


   onClickTrascriptFromMic = () => {

    this.state.model.initialize().then(() => {
      this.state.model
        .transcribeFromAudioFile(blob[0])
        .then((ns) => {
          this.setState({
            notes: ns,
          });
        });
    });
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onTranscribe = () => {

    this.state.model.initialize().then(() => {
      this.state.model
        .transcribeFromAudioFile(this.state.selectedFile)
        .then((ns) => {
          this.setState({
            notes: ns,
          });
        });
    });
  };
  onClickShowViz = () => {
    this.state.viz = new mm.PianoRollCanvasVisualizer(
      this.state.notes,
      inputEl.current
    );
    console.log(JSON.stringify(this.state.notes));
    this.state.playerViz = new mm.Player(false, {
      run: (note) => this.state.viz.redraw(note),
      stop: () => {
        console.log("done");
      },
    });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            {" "}
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h3>Pick file</h3>
        </div>
      );
    }
  };
  componentDidMount() {}
  render() {
    return (
      <div>
        <div>
          <input type="file" onChange={this.onFileChange} id="fileInput" />
        </div>

        {this.fileData()}

        <button onClick={this.onTranscribe}>Transcibe</button>
        <button onClick={this.onClickShowViz}>show Vizualizer</button>
        <br />
        <canvas ref={inputEl} />
        <button
          onClick={() => {
            this.state.playerViz.isPlaying()
              ? this.state.playerViz.stop()
              : this.state.playerViz.start(this.state.notes);
          }}
        >
          PlayViz
        </button>
        <section>
          Recording
          <button onClick={this.onStartRecordButtonClick}>Start</button>
          <button onClick={this.onStopRecordButtonClick}>Stop</button>
          <button onClick={this.onClickTrascriptFromMic}>Transcibe</button>
          <button onClick={this.onClickShowViz}>ShowVizualizer</button>
        </section>
      </div>
    );
  }
}

export default MusicConverter;
