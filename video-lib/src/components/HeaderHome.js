import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider";

export function HeaderHome() {
  const { logout } = useContext(AuthContext);

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
    return <div className="menu-cover" style={{}} ref={menuRef}></div>;
  }

  return (
    <div>
      <MenuCover></MenuCover>
      <div className="header">
        <button
          style={{
            border: "none",
            backgroundColor: "black",
            padding: "0rem",
            margin: "0rem",
            width: "0rem",
          }}
          onClick={() => headerHandler()}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "100", color: "white" }}>
            Netr:
          </h1>
        </button>

        <div
          className="hamburger-btn"
          onClick={() => {
            if (menuStatus.current === true) {
              menuRef.current.style.height = "0vh";
              menuStatus.current = false;
              hamburgerRef1.current.style.transform = "rotate(0deg)";
              hamburgerRef3.current.style.transform = "rotate(0deg)";
              hamburgerRef2.current.style.transform = "translateX(0rem)";
            } else {
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
            <span style={{ color: "white" }} class="material-icons">
              favorite
            </span>
          </Link>

          <Link
            to="/history"
            style={{ margin: "1rem", border: "none", backgroundColor: "black" }}
          >
            <span style={{ color: "white" }} class="material-icons">
              history
            </span>
          </Link>

          <Link
            to="/playlists"
            style={{ margin: "1rem", backgroundColor: "black", border: "none" }}
          >
            <span style={{ color: "white" }} class="material-icons">
              video_library
            </span>
          </Link>
        </div>

        {localStorage.getItem("accessToken") ? (
          <span
            style={{
              position: "relative",
              right: "40%",
              top: "5%",
              color: "white",
              background: "black",
              border: "none",
              fontSize: "1rem",
              textDecoration: "none",
            }}
          >
            <button
              className="logout-btn"
              style={{ backgroundColor: "black", border: "none" }}
            >
              <span
                onClick={() => {
                  logout();
                }}
                class="material-icons"
                style={{ fontSize: "28px", color: "white" }}
              >
                logout
              </span>
            </button>

            <span style={{ marginLeft: "0.8rem" }}>
              Hi {JSON.parse(localStorage.getItem("user")).fname} !
            </span>
          </span>
        ) : (
          <div>
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

            <Link
              to="/login"
              style={{
                position: "absolute",
                margin: "1rem",
                left: "0%",
                top: "40%",
                color: "white",
                background: "black",
                border: "none",
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
