import React from "react";
import "../styles.css";
import { AuthContext } from "../AuthProvider";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import loading from "../1494.gif";

export function Login() {
  const [field, setField] = useState({});

  const { loginWithCredentials, showLoader, loginError } = useContext(
    AuthContext
  );

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
    <div>
      <h1>Login Page</h1>

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
          type="text"
          placeholder="Password"
          onChange={(event) => onChangeHandler(event, { type: "password" })}
        ></input>
      </div>

      <button
        class="primary-button-blue"
        style={{ background: "black", color: "white" }}
        onClick={() => LoginHandler()}
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
