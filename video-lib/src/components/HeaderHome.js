import "../styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
// import { ProcessLoaderContext } from "../LoaderProvider";

export function HeaderHome() {
  const { logout } = useContext(AuthContext);

  // const { showProcessLoader, setShowProcessLoader } = useContext(
  //   ProcessLoaderContext
  // );

  const navigate = useNavigate();

  function headerHandler() {
    if (localStorage.getItem("accessToken")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <div className="header">
        <button
          style={{
            border: "none",
            backgroundColor: "black",
            padding: "0rem",
            margin: "0rem",
            width: "0rem"
          }}
          onClick={() => headerHandler()}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "100", color: "white" }}>
            Netr:
          </h1>
        </button>
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

        {/* <span style={{ position: "absolute",left:"3%",top:"30%",zIndex:"2"}}> 
          <ul style={{ listStyleType: "none", display: "inline",
              color: "black",
              background: "white",
              fontSize: "1rem",
              textDecoration: "none" }}>
            <li style={{border:"1px black solid",padding:"0rem 0.5rem"}}>Logout</li>
            <li style={{border:"1px black solid"}}>Logout</li>
          </ul>
          </span> */}

        {localStorage.getItem("accessToken") ? (
          <span
            style={{
              position: "absolute",
              margin: "1rem",
              left: "3%",
              top: "20%",
              color: "white",
              background: "black",
              border: "none",
              fontSize: "1rem",
              textDecoration: "none"
            }}
          >
            <button style={{ backgroundColor: "black", border: "none" }}>
              <span
                onClick={() => {
                  logout();
                }}
                class="material-icons"
                style={{ fontSize: "28px", color: "white" }}
              >
                logout
                {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACnklEQVRYhe2XPU9UURCGZ4VuExY7WUGTNWQLExeBwh+gJkQjKlppzx8ALSz8WKxRLLSQ+AMEY2LFXrDVxFqjxkJZYhA/oihGiuWx2PdmT6577t67oZNJTs7eeeedM3Nm9txzzf53ySQ1BIpmdtrMjpnZXjPrE1Q1sxUzC8zscSaTebutEQLDwBLJZREY2o6FO4E7wJYcfwXuA6eAIpDVKAKjwKxsEGcG6Gx38W4n6w2gDHQl4HUBU8BvZze628l8UQ5WgOE2EigB7+UjSLUT2naAZSCfdnHHTx6oytetpKQh1W8DOOyxOany/AJ+6vcJj+2gylHz+YsSwq0ve/CpmO73cW4Kr7RavOh0+z8Np8wB/gATQI/GhHQ02wkgB3wT3h8XwGUZzXrwp8InmmCXhC15uA+ET8YFEMho1IOvC+9pguWFrXu4Z3xl2OX83q/5pS9Gb/SNI33Lg7/SvC8ugD2aP3mcvNB8sQl2IWITlY+a/X9rZ4uzHnzEacJJbXte9Q+bcMTDzcaVKDR6I6NCjM08fpmL4RVk8zqKuSVY1lxq4uAAEJjZWW8GZmNAxZPAgOYPcQEEmo9HFj9iZs/M7KiZrZrZFTM7ZGZZjZJ0q1a/KzwXx5XQZ2A+oXEQfQdy0vUCa9I/DPUefg6Yk+0a0Ovof0jvP4hkHB7FV/W8oOd5oCOWXLfvAB6JsyDdNfe5lYPwZbQJjIv4mRTvdGA38EXccfmqAQOt2XUHM5HuvpF0ccdHOeJjOg3ZvZAAnG8jgHMOv0Laqxn1K1n4bthUHb0N6PBywHVxwsXTXckcZ53AbdUPdfJdYIz6wRJeSgvS3aPR7TVgOnXmnkAOAk9ILgEwmNR/mg+Tfmt8mPSZWa+gqkb4YfIueXo7siNmfwF1ixN6Gh9dZwAAAABJRU5ErkJggg==" /> */}
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
                textDecoration: "none"
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
                textDecoration: "none"
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