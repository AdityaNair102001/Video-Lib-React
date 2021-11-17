import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LikedVideosPage } from "./pages/LikedVideos";
import { WatchHistory } from "./pages/WatchHistory";
import { PlayList } from "./pages/Playlist";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { LandingPage } from "./pages/LandingPage";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { PrivateRoute } from "./PrivateRoute";

export default function App() {
  // const[login,setLogin]=useState(false)

  const { login } = useContext(AuthContext);
  console.log("Line 25", login);

  return (
    <div className="App">
      {/* <LikedVideosPage/> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/likedvideos" element={<LikedVideosPage />} /> */}
        <Route path="/likedvideos/:id" element={<LikedVideosPage />} />
        {/* <Route path="/history" element={<WatchHistory />} /> */}
        {/* <Route path="/playlists" element={<PlayList />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/playlists" login={login} element={<PlayList />} />
        <PrivateRoute
          path="/history"
          login={login}
          element={<WatchHistory />}
        />
        <PrivateRoute
          path="/likedvideos"
          login={login}
          element={<LikedVideosPage />}
        />
      </Routes>
    </div>
  );
}
