import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HeaderPage } from "../components/HeaderPage";
import ReactPlayer from "react-player";
import { AuthContext } from "../AuthProvider";
export function WatchHistory() {
  let { id } = useParams();

  const [videos, setVideos] = useState(null);

  const { setupAuthHeaderForServiceCalls } = useContext(AuthContext);

  useEffect(() => {
    setupAuthHeaderForServiceCalls(localStorage.getItem("accessToken"));
    (async () => {
      try {
        const response = await axios.get(
          "https://Video-Lib-Backend.adityanair14.repl.co/watchhistory"
        );
        if (response.data.success === true) {
          // console.log("at 19",response.data.user.watchhistory)
          const watchHistoryArray=response.data.user.watchhistory.reverse();
          // setVideos(response.data.user.watchhistory);
          setVideos(watchHistoryArray);
        }
      } catch (err) {}
    })();
  }, []);

  function RenderVideos({videos}) {
    if (videos.length > 0) {
      return videos.map((item) => {
        return (
          <div
            className="video-container"
            style={{
              display: "flex",
              width: "800px",
              margin: "auto",
              marginBottom: "0.8rem"
            }}
          >
            <ReactPlayer
              controls={true}
              width="300px"
              height="200px"
              style={{ margin: "1rem" }}
              url={item.url}
            />
            <h2 style={{ textAlign: "left", margin: "1rem" }}>{item.title}</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
            </div>
          </div>
        );
      });
    } else {
      return (
        <h2 style={{ margin: "auto", marginTop: "10%", marginLeft: "40%" }}>
          {" "}
          No liked videos
        </h2>
      );
    }
  }

  return (
    <div className="wrapper-history">
      <HeaderPage></HeaderPage>

      <div className="main-history">
        {videos ? (
          <RenderVideos videos={videos}></RenderVideos>
        ) : (
          <h1 style={{ margin: "auto", marginTop: "5%" }}>Loading History..</h1>
        )}
      </div>
    </div>
  );
}
