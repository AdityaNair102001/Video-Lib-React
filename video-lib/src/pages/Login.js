import React from "react";
import "../styles.css";
import { AuthContext } from "../AuthProvider";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import loading from "../loginLoader.gif";

export function Login() {
  const [field, setField] = useState({});

  const { loginWithCredentials, showLoader, loginError } =
    useContext(AuthContext);

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
    <div
      style={{
        backgroundColor: "black",
        position: "fixed",
        top: "0rem",
        left: "0rem",
        right: "0rem",
        bottom: "0rem",
      }}
    >
      <h1 style={{ color: "white" }}>Login Page</h1>

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

      <button class="pulse" onClick={() => LoginHandler()}>
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
      <h3 style={{ color: "white" }}>
        Don't have an account?{" "}
        <em>
          <Link
            style={{ color: "white", textDecoration: "none" }}
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
