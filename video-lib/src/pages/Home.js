import React, { useEffect, useState, useContext, useRef } from "react";
import "../styles.css";
import ReactPlayer from "react-player";
import axios from "axios";

// import Snackbar from "@material-ui/core/Snackbar";

import { Snackbar } from "@material-ui/core";

import processLoader from "../processLoader.gif";
// import MuiAlert from "@material-ui/lab/Alert";

import { HeaderHome } from "../components/HeaderHome.js";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../AuthProvider";

export function Home() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState(null);

  const showProcessLoader = useRef("hidden");

  let likedVideos =
    JSON.parse(localStorage.getItem("user")) === null
      ? []
      : [...JSON.parse(localStorage.getItem("user"))?.likedvideos];

  const { setupAuthHeaderForServiceCalls } = useContext(AuthContext);

  // const { showProcessLoader, setShowProcessLoader } = useContext(
  //   ProcessLoaderContext
  // );

  function caliberate(playingVideoId, videoPlayingId, setVideoPlayingId) {
    setVideoPlayingId(playingVideoId, videoPlayingId);
  }

  function isPlaying(videoId, videoPlayingId) {
    if (videoId !== videoPlayingId) {
      return false;
    } else {
      return true;
    }
  }

  async function addToPlaylist(
    videoId,
    playlistName,
    setOpenSnackbar,
    openSnackbar
  ) {
    try {
      showProcessLoader.current.style.visibility = "visible";
      const response = await axios.post(
        "https://video-lib-backend.adityanair14.repl.co/playlists",
        {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          playlist: playlistName,
          type: "ADD_TO_PLAYLIST",
          videoId,
        }
      );
      console.log(response);
      if (response.data.success === true) {
        // setShowProcessLoader(false);
        setOpenSnackbar({
          ...openSnackbar,
          message: "Added to Playlist!",
          open: true,
        });
        showProcessLoader.current.style.visibility = "hidden";
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.log(err);
    }
  }

  function NewPlaylistModal({
    showNewPlaylistModal,
    setShowNewPlaylistModal,
    setShowModal,
    videoId,
    setOpenSnackbar,
    openSnackbar,
  }) {
    const [playlistName, setPlaylistName] = useState("");

    return (
      <div>
        {showNewPlaylistModal ? (
          <div
            style={{
              position: "fixed" /* Positioning and size */,
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(128,128,128,0.5)",
            }}
          >
            <div
              style={{
                position: "fixed",
                transform: "translate(-50%,-50%)",
                left: "50%",
                top: "50%",
                zIndex: "1",
                height: "fitContent",
                minHeight: "10vh",
                width: "15rem",
                border: "2px black solid",
                padding: "1rem 0rem 0.5rem 0rem",
                backgroundColor: "white",
              }}
            >
              <div>
                <button
                  style={{
                    backgroundColor: "red",
                    position: "relative",
                    // left: "3.5rem",
                    right: "-45%",
                    bottom: "1rem",
                    border: "none",
                  }}
                  onClick={() => {
                    setShowNewPlaylistModal(false);
                    setShowModal(true);
                  }}
                >
                  X
                </button>
              </div>
              Enter Playlist Name:
              <input
                style={{ width: "50%" }}
                onChange={(event) => setPlaylistName(event.target.value)}
              ></input>
              <div>
                <button
                  onClick={() => {
                    addToPlaylist(
                      videoId,
                      playlistName,
                      setOpenSnackbar,
                      openSnackbar
                    );
                    setShowNewPlaylistModal(false);
                  }}
                  style={{ marginTop: "0.5rem", backgroundColor: "white" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  function ShowLoader() {
    return (
      <div style={{ textAlign: "left", gridArea: "n" }}>
        <img
          style={{
            marginTop: "0rem",
            position: "fixed",
            marginLeft: "1rem",
            visibility: "hidden",
          }}
          src={processLoader}
          alt="Processing"
          ref={showProcessLoader}
        />
      </div>
    );
  }

  function ModalAndAddToPlaylistButton({
    videoId,
    openSnackbar,
    setOpenSnackbar,
  }) {
    const playlistsObject =
      JSON.parse(localStorage.getItem("user")) == null
        ? {}
        : { ...JSON.parse(localStorage.getItem("user"))?.playlists };
    const playlistsArray = Object.keys(playlistsObject);

    const [showModal, setShowModal] = useState(false);
    const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false);

    // const [showProcessLoader, setShowProcessLoader] = useState(false);

    const modelBackground = showModal
      ? {
          position: "fixed",
          transform: "translate(-50%,-50%)",
          left: "50%",
          top: "50%",
          zIndex: "1",
          // height: "fitContent",
          minHeight: "10vh",
          width: "15rem",
          border: "2px black solid",
          padding: "1rem 0rem 0.5rem 0rem",
          backgroundColor: "white",
        }
      : {};

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpenSnackbar({ ...openSnackbar, open: false });
    };

    return (
      <div>
        <div>
          <button
            style={{
              // margin: "0",

              marginTop: "1rem",
              border: "none",
              backgroundColor: "white",
              // msTransform: "translateY(-50%)",
              // transform: "translateY(-50%)"
            }}
            // disabled={disableButton}
            onClick={
              showModal
                ? () => {
                    setShowModal(true);
                  }
                : () => {
                    setShowModal(true);
                  }
            }
          >
            {/* Add to */}
            <span style={{ fontSize: "30px" }} class="material-icons">
              playlist_add
            </span>
          </button>
        </div>

        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {/* <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert> */}

          <div
            style={{
              backgroundColor: "black",
              color: "white",
              width: "10rem",
              height: "2rem",
              paddingTop: "0.5rem",
              elevation: "3rem",
              borderRadius: "5px",
            }}
          >
            {openSnackbar.message}
          </div>
        </Snackbar>

        {showModal && playlistsArray ? (
          <div
            style={{
              position: "fixed" /* Positioning and size */,
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(128,128,128,0.5)",
            }}
          >
            <div style={modelBackground}>
              <button
                style={{
                  backgroundColor: "red",
                  position: "relative",
                  // left: "3.5rem",
                  right: "-45%",
                  bottom: "1rem",
                  border: "none",
                }}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                X
              </button>
              <div style={{ margin: "1rem" }}>
                <div>Add to playlist:</div>

                <div
                  style={{
                    height: "40vh",
                    overflowY: "scroll",
                    border: "1px grey solid",
                  }}
                >
                  {playlistsArray.map((item) => {
                    return (
                      <div style={{ margin: "0.5rem" }}>
                        <button
                          onClick={() => {
                            // postToPlaylist(playlistsObject[item]._id, item);
                            addToPlaylist(videoId, item, setOpenSnackbar);
                            setShowModal(false);
                            console.log(playlistsObject[item]);
                          }}
                          style={{ backgroundColor: "white" }}
                        >
                          {item}{" "}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={
                    showNewPlaylistModal
                      ? () => {
                          setShowNewPlaylistModal(true);
                          setShowModal(false);
                        }
                      : () => {
                          setShowNewPlaylistModal(true);
                          setShowModal(false);
                        }
                  }
                  style={{ backgroundColor: "white", marginTop: "0.8rem" }}
                >
                  Create Playlist
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {" "}
          <NewPlaylistModal
            showNewPlaylistModal={showNewPlaylistModal}
            setShowNewPlaylistModal={setShowNewPlaylistModal}
            setShowModal={setShowModal}
            videoId={videoId}
            setOpenSnackbar={setOpenSnackbar}
            openSnackbar={openSnackbar}
            // setShowProcessLoader={setShowProcessLoader}
          ></NewPlaylistModal>
        </div>
      </div>
    );
  }

  async function postToPlaylist(videoId, playlistName) {
    try {
      const response = await axios.post(
        "https://video-lib-backend.adityanair14.repl.co/playlists",
        {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          videoId,
          type: "ADD_TO_PLAYLIST",
          playlist: playlistName,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  function postLike(videoId) {
    if (localStorage.getItem("accessToken")) {
      (async (videoId) => {
        try {
          const response = await axios.post(
            "https://Video-Lib-Backend.adityanair14.repl.co/likedvideos",
            {
              userId: JSON.parse(localStorage.getItem("user"))._id,
              videoId,
              type: "LIKE",
              //  headers: { authorization: 'abcdefghi' }
            }
          );

          if (response.data.success === true) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        } catch (err) {
          console.log(err);
        }
      })(videoId);
    } else {
      navigate("/login");
    }
  }

  function watchHistory(videoId) {
    if (localStorage.getItem("accessToken")) {
      (async (videoId) => {
        try {
          const response = await axios.post(
            "https://Video-Lib-Backend.adityanair14.repl.co/watchhistory",
            {
              userId: JSON.parse(localStorage.getItem("user"))._id,
              videoId,
              //  headers: { authorization: 'abcdefghi' }
            }
          );
          if (response.data.success === true) {
          }
        } catch (err) {
          console.log(err);
        }
      })(videoId);
    } else {
      navigate("/login");
    }
  }

  function unlike(videoId) {
    if (localStorage.getItem("accessToken")) {
      (async (videoId) => {
        try {
          const response = await axios.post(
            "https://Video-Lib-Backend.adityanair14.repl.co/likedvideos",
            {
              userId: JSON.parse(localStorage.getItem("user"))._id,
              videoId,
              type: "REMOVE",
            }
          );

          if (response.data.success === true) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        } catch (err) {
          console.log(err);
        }
      })(videoId);
    }
  }

  function exists(item) {
    let found = false;
    console.log("87", likedVideos);
    for (var i = 0; i < likedVideos.length; i++) {
      console.log("at 90", likedVideos[i]);
      console.log("at 91", item._id);
      if (likedVideos[i]._id === item._id) {
        found = true;
        break;
      }
    }
    return found;
  }

  function LikeButton({ item, likeState, setLikeState, onClick }) {
    return (
      <button
        style={{
          margin: "1rem 1rem",
          backgroundColor: "white",
          border: "0px white solid",
        }}
        onClick={onClick}
      >
        {likeState ? (
          <img src="https://img.icons8.com/material-sharp/24/000000/facebook-like.png" />
        ) : (
          <img src="https://img.icons8.com/material-outlined/24/000000/facebook-like.png" />
        )}
      </button>
    );
  }

  function VideoHolder({
    videoPlayingId,
    setVideoPlayingId,
    item,
    defaultLikeState,
  }) {
    const [likeState, setLikeState] = useState(defaultLikeState);
    // const [openSnackbar, setOpenSnackbar] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState({
      open: false,
      message: null,
    });

    return (
      <div key={item._id} className="video-container">
        <ReactPlayer
          playing={isPlaying(item._id, videoPlayingId)}
          controls={true}
          url={item?.url}
          width="100%"
          height="200px"
          onPlay={() => {
            caliberate(item._id, videoPlayingId, setVideoPlayingId);
            if (localStorage.getItem("accessToken")) {
              watchHistory(item._id);
            }
          }}
        />
        <h4 style={{ textAlign: "left", margin: "1rem", width: "100%" }}>
          {item.title}
        </h4>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={{
              margin: "1rem",
              marginRight: "5rem",
              backgroundColor: "white",
              border: "none",
            }}
            onClick={() =>
              addToWatchLater(item._id, setOpenSnackbar, openSnackbar)
            }
          >
            <span class="material-icons">watch_later</span>
          </button>

          {/* <button
            onClick={() => {
              console.log(modalStatus.current);
              modalStatus.current
                ? (modalStatus.current = false)
                : (modalStatus.current = true);
            }}
            style={{ margin: "1rem 1rem" }}
          >
            Add to
          </button> */}
          <ModalAndAddToPlaylistButton
            videoId={item._id}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
          ></ModalAndAddToPlaylistButton>

          {localStorage.getItem("accessToken") ? (
            <LikeButton
              item={item}
              likeState={likeState}
              setLikeState={setLikeState}
              onClick={
                likeState
                  ? () => {
                      unlike(item._id);
                      setLikeState(false);
                    }
                  : () => {
                      postLike(item._id);
                      setLikeState(true);
                    }
              }
            ></LikeButton>
          ) : (
            <LikeButton onClick={() => navigate("/login")}>
              {/*unlike*/}
            </LikeButton>
          )}
        </div>
      </div>
    );
  }

  async function addToWatchLater(videoId, setOpenSnackbar, openSnackbar) {
    try {
      showProcessLoader.current.style.visibility = "visible";
      const response = await axios.post(
        "https://video-lib-backend.adityanair14.repl.co/playlists",
        {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          playlist: "Watch Later",
          type: "ADD_TO_PLAYLIST",
          videoId,
        }
      );
      if (response.data.success === true) {
        // setShowProcessLoader(false);
        setOpenSnackbar({
          ...openSnackbar,
          message: "Added to Watch Later",
          open: true,
        });
        showProcessLoader.current.style.visibility = "hidden";
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.log(err);
    }
  }

  function RenderVideos({ videos }) {
    const [videoPlayingId, setVideoPlayingId] = useState(null);

    return videos.map((item) => {
      return (
        <VideoHolder
          videoPlayingId={videoPlayingId}
          setVideoPlayingId={setVideoPlayingId}
          item={item}
          defaultLikeState={exists(item)}
        ></VideoHolder>
      );
    });
  }

  function getLikedVideos() {
    // setLikedVideos([
    //   ...likedVideos,
    //   ...JSON.parse(localStorage.getItem("user"))?.likedvideos
    // ]);

    likedVideos = [...JSON.parse(localStorage.getItem("user"))?.likedvideos];
    console.log("at 154", likedVideos);
  }
  async function getData() {
    try {
      const response = await axios.get(
        "https://Video-Lib-Backend.adityanair14.repl.co/videos"
      );
      console.log("in getData", response);
      if (response.data.success === true) {
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        if (localStorage.getItem("accessToken")) {
          getLikedVideos();
        }
        setVideos(response.data.videos);
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setupAuthHeaderForServiceCalls(localStorage.getItem("accessToken"));
    console.log("178");
    getData();

    console.log("180");
  }, []);

  // function Alert(props) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }

  return (
    <div className="wrapper-home">
      <HeaderHome></HeaderHome>
      <ShowLoader></ShowLoader>

      {console.log("at 195", likedVideos)}
      <div class="main-home">
        {videos ? (
          <div class="main-home">
            <RenderVideos videos={videos}></RenderVideos>
          </div>
        ) : (
          <h1 style={{ margin: "auto", marginTop: "5%" }}>Loading Videos..</h1>
        )}
      </div>
    </div>
  );
}
