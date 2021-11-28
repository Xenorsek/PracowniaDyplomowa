import React from "react";
import * as mm from "@magenta/music";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";
import { useAddFavorites } from "../hooks/useAddFavorites";
import { useRemoveFavorites } from "../hooks/useRemoveFavorites";
import * as BsIcon from "react-icons/bs";
function withMyHooks(Component) {
  return function WrappedComponent(props) {
    const useAuthContextValue = useAuthContext();
    const useAddFavoritesValue = useAddFavorites();
    const useRemoveFavoritesValue = useRemoveFavorites();
    return (
      <Component
        {...props}
        useAuthContextValue={useAuthContextValue}
        useAddFavoritesValue={useAddFavoritesValue}
        useRemoveFavoritesValue={useRemoveFavoritesValue}
      />
    );
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
      likesValue: 0,
      isLiked: false,
      FavoritesPending: false,
      isPlaying: false,
      publicStatusLoading: false,
      isDeleted: false,
      isPendingDelete:false,
    };
  }

  handlePublic = async (e) => {
    this.setState({ publicStatusLoading: true })
    e.preventDefault();
    if (!this.state.publicStatus) {
      try {
        await projectFirestore
          .collection("musicSequences")
          .doc(this.state.id)
          .update({ publicStatus: true })
          .then(() => {
            console.log("Document successfully updated!");
            this.setState({ publicStatus: true, publicStatusLoading: false })
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            this.setState({ publicStatusLoading: false })
          });
      } catch (err) {
        console.log(err);
        this.setState({ publicStatusLoading: false })
      }
    } else {
      console.log("Element is already set on public");
      this.setState({ publicStatusLoading: false })
    }
  };

  handlePrivate = async (e) => {
    this.setState({ publicStatusLoading: true })
    e.preventDefault();
    if (this.state.publicStatus) {
      try {
        await projectFirestore
          .collection("musicSequences")
          .doc(this.state.id)
          .update({ publicStatus: false })
          .then(() => {
            console.log("Document successfully updated!");
            this.setState({ publicStatus: false, publicStatusLoading: false })
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            this.setState({ publicStatusLoading: false })
          });
      } catch (err) {
        console.log(err);
        this.setState({ publicStatusLoading: false })
      }
    } else {
      console.log("Element is already set on private");
      this.setState({ publicStatusLoading: false })
    }
  };

  handleAddToFavorites = async (e) => {
    e.preventDefault();
    this.setState({ FavoritesPending: true })
    this.props.useAddFavoritesValue.addToFavorites(this.props.seq.id, this.props.user.uid).then(() => {
      let increment = this.state.likesValue + 1;
      this.setState({ FavoritesPending: false, isLiked: true, likesValue: increment })
    }).catch((err) => {
      console.log(err.message)
      this.setState({ FavoritesPending: false })
    });
  };
  handleRemoveFromFavorites = async (e) => {
    e.preventDefault();
    this.setState({ FavoritesPending: true })
    this.props.useRemoveFavoritesValue.removeFromFavorites(
      this.props.seq.id,
      this.props.user.uid
    ).then(() => {
      let decrement = this.state.likesValue - 1;
      this.setState({ FavoritesPending: false, isLiked: false, likesValue: decrement })
    }).catch((err) => {
      console.log(err.message)
      this.setState({ FavoritesPending: false })
    });
  };
  handleDelete = async (e) => {
    e.preventDefault();
    this.setState({isPendingDelete:true})
    try {
      await projectFirestore
        .collection("musicSequences")
        .doc(this.state.id)
        .delete()
        .then(() => {
          this.setState({ isDeleted: true, isPendingDelete:false })
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          this.setState({isPendingDelete:false})
          console.error("Error removing document: ", error);
        });
    } catch (err) {
      console.log(err);
      this.setState({isPendingDelete:false})
    }
  };
  handlePlayButton = (e) => {
    if (this.state.playerViz.isPlaying()) {
      this.state.playerViz.stop()
      this.setState({ isPlaying: false })
    }
    else {
      this.state.playerViz.start(this.state.seq)
      this.setState({ isPlaying: true })
    }
  }

  componentDidMount() {
    this.setState({
      viz: new mm.PianoRollCanvasVisualizer(
        this.state.seq,
        inputEl.current
      ),
      playerViz: new mm.Player(false, {
        run: (note) => this.state.viz.redraw(note),
        stop: () => {
          console.log("done");
          this.setState({ isPlaying: false })
        },
      })
    })
    projectFirestore
      .collection("favorites")
      .where("musicSequences", "==", this.props.seq.id)
      .get()
      .then((snapshot) => {
        this.setState({ likesValue: snapshot.size });
      });
    if (this.props.user) {
      projectFirestore
        .collection("favorites")
        .where("musicSequences", "==", this.props.seq.id)
        .where("user", "==", this.props.user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.size > 0) {
            this.setState({ isLiked: true });
          }
        });
    }
  }
  render() {
    return (
      <div>
        <div>
          <h1>Title: {this.state.title}</h1>
          <h5>By: {this.state.name}</h5>
        </div>
        {(this.props.user && !this.state.privateCollection) && (
          <>
            {(!this.state.isLiked && !this.state.FavoritesPending) && (
              <div className="HeartIconBox" onClick={this.handleAddToFavorites}><BsIcon.BsHeart className="HeartIcon" color="red" /><span className="likeValue">{this.state.likesValue}</span></div>

            )}
            {(this.state.isLiked && !this.state.FavoritesPending) && (
              <div className="HeartIconBox" onClick={this.handleRemoveFromFavorites}><BsIcon.BsHeartFill className="HeartIcon" color="red" /><span className="likeValue">{this.state.likesValue}</span></div>
            )}
            {this.state.FavoritesPending && (
              <div className="HeartIconBox"><BsIcon.BsHeartHalf className="HeartIcon" color="red" /><span className="likeValue">{this.state.likesValue}</span></div>
            )}
          </>
        )}
        <canvas onClick={this.handlePlayButton} className="musicSequence" ref={inputEl} />
        <div className="playButton" onClick={this.handlePlayButton}>
          {this.state.isPlaying && (<BsIcon.BsPauseCircleFill className="heartIcon" />)}
          {!this.state.isPlaying && (<BsIcon.BsFillPlayCircleFill className="heartIcon" />)}
        </div>

        {this.state.privateCollection && (
          <>
            {(!this.state.publicStatus && !this.state.publicStatusLoading) && (
              <button onClick={this.handlePublic}>Public</button>
            )}
            {(this.state.publicStatus && !this.state.publicStatusLoading) && (
              <button onClick={this.handlePrivate}>Private</button>
            )}
            {this.state.publicStatusLoading && (
              <button disabled >Loading</button>
            )}
            {(this.state.isDeleted && !this.state.isPendingDelete) && (
              <button disabled>Deleted</button>
            )}
            {(!this.state.isDeleted && !this.state.isPendingDelete) && (
              <button onClick={this.handleDelete}>Delete</button>
            )}
            {this.state.isPendingDelete && (
              <button disabled>Loading</button>
            )}
          </>
        )}
      </div>
    );
  }
}
export default withMyHooks(Element);
