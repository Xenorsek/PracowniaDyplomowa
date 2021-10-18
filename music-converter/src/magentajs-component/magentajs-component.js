import React from "react";

import * as mm from "@magenta/music";

const inputEl = React.createRef(null);

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
    recorder: new mm.Recorder(),
    seq: null,
  };

  onStartRecordButtonClick = () => {
    this.state.recorder.callbackObject = null;
    this.state.recorder.start();
    console.log("Recording Start");
  };

  onStopRecordButtonClick = () => {
    const sequence = this.state.recorder.stop();
    console.log(sequence);
    this.setState({
      seq: sequence,
    });
    console.log("Recording Stop");
  };

  // onClickShowSeqBTn = () => {
  //   console.log(this.state.seq);
  //   console.log(this.state.recorder.getNoteSequence());
  // };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  onTranscribe = (event) => {
    this.setState({ notes: event });
  };
  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
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
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <div>
          <input type="file" onChange={this.onFileChange} id="fileInput" />
          <button onClick={this.onFileUpload}>Upload!</button>
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
          <button onClick={this.onClickShowSeqBTn}>Show</button>
        </section>
      </div>
    );
  }
}

export default MusicConverter;
