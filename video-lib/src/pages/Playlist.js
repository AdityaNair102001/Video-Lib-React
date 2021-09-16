import React, { useEffect, useRef, useContext, useState } from "react";
import { useParams } from "react-router";
import { HeaderPage } from "../components/HeaderPage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactPlayer from "react-player";
// import rightarrow from "./rightarrow.jpeg";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

export function PlayList() {
  let { id } = useParams();

  const [playlists, setPlaylists] = useState(null);

  const { setupAuthHeaderForServiceCalls } = useContext(AuthContext);

  function SinglePlaylistHorizontalSlot({ playlistName }) {
    const scroller = useRef();

    function leftScroll() {
      scroller.current.scrollLeft -= 400;
    }

    function rightScroll() {
      scroller.current.scrollLeft += 400;
    }

    return (
      <div style={{ width: "100%", margin: "auto" }}>
        <h3 style={{ textAlign: "left" }}>{playlistName}</h3>
        <div
          style={{
            border: "0.5px grey solid",
            borderRight:"none",
            borderLeft:"none",
            margin: "auto",
            width: "100%",
            marginTop: "0.5rem",
            display: "flex",
            flexDirection: "row",
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
          <button
            onClick={() => {
              leftScroll();
            }}
            style={{
              // margin: "1rem",
              margin: "auto",
              marginLeft: "0rem",
              // marginLeft:"0rem",
              padding: "0.5rem",
              backgroundColor: "white",
              border: "none"
            }}
          >
            <img src="https://img.icons8.com/dotty/80/000000/long-arrow-left.png" />
          </button>{" "}
          <div
            ref={scroller}
            style={{
              display: "flex",
              flexDirection: "row",
              // overflowX: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              border: "1px #D1D9D9 solid"
            }}
          >
            {" "}
            {playlists[playlistName].map((itemInArray) => {
              return (
                <div style={{ border: "0.1px white solid" }}>
                  <ReactPlayer
                    width="300px"
                    height="200px"
                    controls={true}
                    style={{ margin: "1rem" }}
                    url={itemInArray.url}
                  ></ReactPlayer>
                  {itemInArray.title}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => rightScroll()}
            style={{
              // margin: "1rem",
              margin: "auto",
              marginRight: "0rem",
              padding: "0.5rem",
              backgroundColor: "white",
              border: "1px white solid"
              // position:"relative",
              // right:"0rem"
            }}
          >
            <img src="https://img.icons8.com/dotty/80/000000/long-arrow-right.png" />
            {/* <img style={{backgroundColor:"white"}} src={rightarrow} /> */}
          </button>
        </div>
      </div>
    );
  }

  function RenderPlaylists({ playlists }) {
    const playlistArray = Object.keys(playlists);

    if(playlistArray.length>0){
      return playlistArray
      .reduce(function (result, playlistName) {
        if (playlistName !== "Watch Later") {
          result.push(playlistName);
        }

        return result;
      }, [])
      .map((playlistName) => {
        return (
          <SinglePlaylistHorizontalSlot
            playlistName={playlistName}
          ></SinglePlaylistHorizontalSlot>
        );
      });
    }else{
      return (
        <h2 style={{ margin: "auto", marginTop: "10%" }}>
          {" "}
          No Playlists Made!
        </h2>
      );
    }
 
  }

  function WatchLater({ watchLater }) {
    // if(watchLater.length>0){
    //   return (
    //     <SinglePlaylistHorizontalSlot
    //       playlistName={"Watch Later"}
    //     ></SinglePlaylistHorizontalSlot>
    //   );
    // }else{
    //   return (
    //     <h2 style={{ margin: "auto", marginTop: "10%" }}>
    //       {" "}
    //       Nothing in Watch Later!
    //     </h2>
    //   );
    // }

        return (
        <SinglePlaylistHorizontalSlot
          playlistName={"Watch Later"}
        ></SinglePlaylistHorizontalSlot>
      );
  
  }

  async function getPlaylists() {
    try {
      const response = await axios.get(
        "https://video-lib-backend.adityanair14.repl.co/playlists"
      );
      console.log(response);
      if (response.data.success === true) {

        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        setPlaylists(response.data.user.playlists);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setupAuthHeaderForServiceCalls(localStorage.getItem("accessToken"));
    getPlaylists();
  }, []);

  return (
    <div className="wrapper-playlist">
      <HeaderPage></HeaderPage>

      <div className="main-playlist" style={{}}>
        {playlists ? (
          <div style={{ width: "100%", margin: "auto" }}>
            {playlists["Watch Later"]!=undefined?<WatchLater watchLater={playlists["Watch Later"]}></WatchLater>:<div></div>}
            
            <RenderPlaylists playlists={playlists}></RenderPlaylists>
          </div>
        ) : (
          // <RenderPlaylists playlists={playlists}></RenderPlaylists>
          <h1 style={{ margin: "auto" }}>Loading Playlists..</h1>
        )}

        <div></div>
      </div>
    </div>
  );
}
