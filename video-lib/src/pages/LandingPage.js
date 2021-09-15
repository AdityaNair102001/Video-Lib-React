import "../styles.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useContext, useState } from "react";
import logo from "./eyelogo.png";
import loading from "../1494.gif";

export function LandingPage() {
  const [field, setField] = useState({});

  const {
    loginWithCredentials,

    showLoader,

    loginError
  } = useContext(AuthContext);

  function onChangeHandler(event, { type }) {
    if (type === "username") {
      setField({ ...field, username: event.target.value });
    } else if (type === "password") {
      setField({ ...field, password: event.target.value });
    }
  }

  function LoginHandler() {
    loginWithCredentials(field);
  }

  return (
    <div className="wrapper-landingpage">
      {/* <img src="https://media.istockphoto.com/vectors/phoenix-logo-vector-id1086955338?k=6&m=1086955338&s=612x612&w=0&h=hE_76b0Y11r9Hz2HH3QCK2TGq7TO-01M6Kr3EMDjdds=" /> */}
      <img style={{ margin: "2rem" }} src={logo} width="100%" height="30%" />

      <Link to="/home">
        <button
          class="secondary-button-blue"
          style={{ backgroundColor: "white", color: "black" }}
        >
          Browse!
        </button>
      </Link>

      <h2>Login</h2>

      <div class="inputtext-holder" style={{ margin: "1rem" }}>
        <input
          class="input-standard"
          style={{ width: "20rem" }}
          type="text"
          placeholder="Username"
          onChange={(event) => onChangeHandler(event, { type: "username" })}
        ></input>
      </div>
      <div class="inputtext-holder" style={{ margin: "1rem" }}>
        <input
          class="input-standard"
          style={{ width: "20rem" }}
          type="password"
          placeholder="Password"
          onChange={(event) => onChangeHandler(event, { type: "password" })}
        ></input>
      </div>

      <button
        class="primary-button-blue"
        style={{ background: "black", color: "white" }}
        onClick={LoginHandler}
      >
        Login
      </button>

      <div style={{ margin: "1rem" }}>
        {showLoader ? <img alt="Signing in.." src={loading} /> : ""}
      </div>

      {loginError ? (
        <div style={{}} class="alert">
          <span class="alertText">{loginError}</span>
        </div>
      ) : (
        ""
      )}

      <h3>
        Don't have an account?{" "}
        <em>
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/signup"
            replace
          >
            Sign up here!
          </Link>
        </em>
      </h3>
    </div>
  );
}
