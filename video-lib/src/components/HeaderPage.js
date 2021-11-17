import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

export function HeaderPage() {
  const navigate = useNavigate();

  function headerHandler() {
    if (localStorage.getItem("accessToken")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }

  const menuRef = useRef("");
  const menuStatus = useRef(false);

  const hamburgerRef1 = useRef("");
  const hamburgerRef2 = useRef("");
  const hamburgerRef3 = useRef("");

  function MenuCover() {
    return (
      <div className="menu-cover" style={{}} ref={menuRef}>
        <div style={{ marginTop: "5%" }}>
          {localStorage.getItem("accessToken") ? (
            <h2
              style={{
                color: "white",
                cursor: "pointer",
                fontFamily: "Cormorant Unicase",
              }}
            >
              Hi {JSON.parse(localStorage.getItem("user")).fname}!
            </h2>
          ) : (
            <div></div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "50vh",
          }}
        >
          <div>
            <Link
              to="/likedvideos"
              style={{
                margin: "1rem",
                border: "none",
                backgroundColor: "black",
              }}
            >
              <span className="gicon-style">
                <span style={{ fontSize: "4rem" }} class="material-icons">
                  favorite
                </span>
              </span>
            </Link>
          </div>

          <div>
            <Link
              to="/history"
              style={{
                margin: "1rem",
                border: "none",
                backgroundColor: "black",
              }}
            >
              <span className="gicon-style">
                <span style={{ fontSize: "4rem" }} class="material-icons">
                  history
                </span>
              </span>
            </Link>
          </div>

          <div>
            <Link
              to="/playlists"
              style={{
                margin: "1rem",
                backgroundColor: "black",
                border: "none",
              }}
            >
              <span className="gicon-style">
                <span style={{ fontSize: "4rem" }} class="material-icons">
                  video_library
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    menuRef.current.style.visibility = "hidden";
  });

  return (
    <div>
      <MenuCover></MenuCover>
      <div className="header">
        <h1
          onClick={() => headerHandler()}
          style={{
            cursor: "pointer",
            fontSize: "2rem",
            fontWeight: "100",
            color: "white",
          }}
        >
          Netr:
        </h1>
        <div
          className="hamburger-btn"
          onClick={() => {
            if (menuStatus.current === true) {
              menuRef.current.style.visibility = "hidden";
              menuRef.current.style.height = "0vh";
              menuStatus.current = false;
              hamburgerRef1.current.style.transform = "rotate(0deg)";
              hamburgerRef3.current.style.transform = "rotate(0deg)";
              hamburgerRef2.current.style.transform = "translateX(0rem)";
            } else {
              menuRef.current.style.visibility = "visible";
              menuRef.current.style.height = "100vh";
              menuStatus.current = true;
              hamburgerRef1.current.style.transform =
                "translateY(0.5rem) rotate(45deg)";
              hamburgerRef3.current.style.transform =
                "translateY(-0.5rem) rotate(-45deg)";
              hamburgerRef1.current.style.transition = "all 0.5s";
              hamburgerRef3.current.style.transition = "all 0.5s";
              hamburgerRef2.current.style.transform = "translateX(-100rem)";
              hamburgerRef2.current.style.transition = "all 0.5s";
            }
          }}
        >
          <div ref={hamburgerRef1} className="hamburger1"></div>
          <div ref={hamburgerRef2} className="hamburger2"></div>
          <div ref={hamburgerRef3} className="hamburger3"></div>
        </div>
        <div className="LikedHistoryButtons">
          <Link
            to="/likedvideos"
            style={{ margin: "1rem", border: "none", backgroundColor: "black" }}
          >
            {/* <img src="https://img.icons8.com/android/24/ffffff/thumb-up.png" /> */}
            <span style={{ color: "white" }} class="material-icons">
              favorite
            </span>
          </Link>

          <Link
            to="/history"
            style={{ margin: "1rem", border: "none", backgroundColor: "black" }}
          >
            {/* <img src="https://img.icons8.com/ios-filled/25/ffffff/tenses.png" /> */}
            <span style={{ color: "white" }} class="material-icons">
              history
            </span>
          </Link>

          <Link
            to="/playlists"
            style={{ margin: "1rem", backgroundColor: "black", border: "none" }}
          >
            {/* <img src="https://img.icons8.com/carbon-copy/25/ffffff/video-playlist.png" /> */}
            <span style={{ color: "white" }} class="material-icons">
              video_library
            </span>
          </Link>
        </div>

        <Link
          to="/home"
          style={{
            position: "absolute",
            margin: "1rem",
            left: "3%",
            top: "40%",
            color: "white",
            background: "black",
            border: "none",
            fontSize: "1rem",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
      </div>
    </div>
  );
}
