import React from "react";
import * as mm from "@magenta/music";
const sampleSequences = require("./samplesSequences");
function Canvas() {
    const inputEl = React.createRef(null);
    const onButtonClick = () => {
      const Viz = new mm.PianoRollCanvasVisualizer(sampleSequences.array[0], inputEl.current);
    }
      return (
        <>
          <canvas ref={inputEl}></canvas>
          <button onClick={onButtonClick}>Click me</button>
        </>
      );
    };
  export default Canvas;