import React from "react";
import * as mm from "@magenta/music";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";

function withMyHooks(Component) {
  return function WrappedComponent(props) {
    const useAuthContextValue = useAuthContext();
    return <Component {...props} useAuthContextValue={useAuthContextValue} />;
  };
}

const inputEl = React.createRef(null);

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      seq: this.props.seq,
      player: new mm.Player(),
      viz: {},
      playerViz: {},
      name: this.props.name,
      key: this.props.key,
      id: this.props.seq.id,
      privateCollection: this.props.privateCollection,
      publicStatus: this.props.seq.publicStatus,
    };
  }
  handlePublic = async (e) => {
    e.preventDefault();
    if (!this.state.publicStatus) {
      try {
        await projectFirestore
          .collection("musicSequences")
          .doc(this.state.id)
          .update({ publicStatus: true })
          .then(() => {
            console.log("Document successfully updated!");
            this.state.publicStatus = true;
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Element is already set on public");
    }
  };

  handlePrivate = async (e) => {
    e.preventDefault();
    if (this.state.publicStatus) {
      try {
        await projectFirestore
          .collection("musicSequences")
          .doc(this.state.id)
          .update({ publicStatus: false })
          .then(() => {
            console.log("Document successfully updated!");
            this.state.publicStatus = false;
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Element is already set on private");
    }
  };

  handleAddToFavorites = async (e) => {
    e.preventDefault();
  }

  handleDelete = async (e) => {
    e.preventDefault();
    try {
      await projectFirestore
        .collection("musicSequences")
        .doc(this.state.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.state.viz = new mm.PianoRollCanvasVisualizer(
      this.state.seq,
      inputEl.current
    );
    this.state.playerViz = new mm.Player(false, {
      run: (note) => this.state.viz.redraw(note),
      stop: () => {
        console.log("done");
      },
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <canvas ref={inputEl} />
        <div>
          <h1>{this.state.title}</h1>
        </div>
        <button
          onClick={() => {
            this.state.player.isPlaying()
              ? this.state.player.stop()
              : this.state.player.start(this.state.seq);
          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            this.state.playerViz.isPlaying()
              ? this.state.playerViz.stop()
              : this.state.playerViz.start(this.state.seq);
          }}
        >
          PlayViz
        </button>
        {!this.state.privateCollection && (
          <button onClick={this.handleAddToFavorites}>Add to favorites</button>
        )}
        {this.state.privateCollection && (
          <>
            {!this.state.publicStatus && (
              <button onClick={this.handlePublic}>Public</button>
            )}
            {this.state.publicStatus && (
              <button onClick={this.handlePrivate}>Private</button>
            )}
            <button onClick={this.handleDelete}>Delete</button>
          </>
        )}
      </div>
    );
  }
}
export default withMyHooks(Element);
