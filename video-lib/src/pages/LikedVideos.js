import React, { useEffect } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import { useState, useContext, useRef } from "react";
import axios from "axios";
import { HeaderPage } from "../components/HeaderPage";

import { AuthContext } from "../AuthProvider";

import processLoader from "../processLoader.gif";

import { Link } from "react-router-dom";

export function LikedVideosPage() {
  let { id } = useParams();

  const [videos, setVideos] = useState(null);

  const showProcessLoader = useRef("hidden");

  const { setupAuthHeaderForServiceCalls } = useContext(AuthContext);

  function remove(videoId) {
    if (localStorage.getItem("accessToken")) {
      (async (videoId) => {
        try {
          showProcessLoader.current.style.visibility = "visible";
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
            getData();
            // showProcessLoader.current.style.visibility = "hidden";
          }
        } catch (err) {
          console.log(err);
        }
      })(videoId);
    }
  }

  function ShowLoader() {
    return (
      <div style={{ textAlign: "left", gridArea: "n" }}>
        <img
          style={{
            marginTop: "3rem",
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

  function DeleteButton() {
    // const [color,setColor]=useState("black")
    const deleteRef = useRef("black");
    return (
      <span
        class="material-icons"
        style={{ position: "absolute" }}
        ref={deleteRef}
        onMouseEnter={() => {
          deleteRef.current.style.color = "red";
          deleteRef.current.style.fontSize = "32px";
        }}
        onMouseLeave={() => {
          deleteRef.current.style.color = "black";
          deleteRef.current.style.fontSize = "24px";
        }}
      >
        delete
      </span>
    );
  }

  function RenderVideos(videos) {
    if (videos.length > 0) {
      return videos.map((item) => {
        return (
          <div className="video-container">
            <ReactPlayer
              controls={true}
              width="100%"
              height="200px"
              url={item.url}
            />
            <h3 style={{ textAlign: "left", margin: "1rem", height: "2vh" }}>
              {item.title}
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => remove(item._id)}
                style={{
                  margin: "1rem 1rem",
                  backgroundColor: "white",
                  border: "none",
                }}
              >
                <div style={{ height: "1rem" }}>
                  <DeleteButton></DeleteButton>
                </div>
              </button>
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

  async function getData() {
    try {
      const response = await axios.get(
        "https://Video-Lib-Backend.adityanair14.repl.co/likedvideos"
        // {
        //   headers: {
        //     "Authorization":  "BEARER " + localStorage.getItem("accessToken")
        //   }
        // }
      );

      if (response.data.success === true) {
        setVideos(response.data.user.likedvideos);
        console.log(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        localStorage.setItem("loginState", false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setupAuthHeaderForServiceCalls(localStorage.getItem("accessToken"));
    getData();
  }, []);

  return (
    <div className="wrapper-likedvideos">
      <HeaderPage></HeaderPage>
      <ShowLoader></ShowLoader>

      <div className="main-likedvideos">
        {videos ? (
          RenderVideos(videos)
        ) : (
          <h1 style={{ margin: "auto", marginTop: "5%" }}>
            Loading Liked Videos..
          </h1>
        )}
      </div>
    </div>
  );
}
