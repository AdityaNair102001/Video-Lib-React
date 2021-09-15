import "../styles.css";
import { Link, useNavigate } from "react-router-dom";

export function HeaderPage() {
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
          textDecoration: "none"
        }}
      >
        Home
      </Link>
    </div>
    </div>
  );
}
