import axios from "axios";
import React, { useContext, useState } from "react";
import "../styles.css";
import { AuthContext } from "../AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import loading from "../loginLoader.gif";

export function Signup() {
  const [field, setField] = useState({});

  const navigate = useNavigate();

  const { showLoader, loginError, setLoginError, setShowLoader } =
    useContext(AuthContext);

  async function postData(field) {
    try {
      setShowLoader(true);
      const data = field;
      console.log(data);
      const response = await axios.post(
        "https://Video-Lib-Backend.adityanair14.repl.co/signup",
        data
      );
      console.log(response);
      if (response.data.success === true) {
        setShowLoader(false);
        navigate("/login", { replace: true });
        console.log("sucessfully posted");
      } else {
        setShowLoader(false);
        setLoginError(response.data.message);
        signUpErrorHandler();
      }
    } catch (err) {
      setShowLoader(false);
      setLoginError(err.response.data.message);
      signUpErrorHandler();

      console.log(err);
    }
  }

  function signUpErrorHandler() {
    setTimeout(function () {
      setLoginError(false);
    }, 2000);
  }

  function SignUpHandler() {
    postData(field);
  }

  function onChangeHandler(event, { type }) {
    if (type === "fname") {
      setField({ ...field, fname: event.target.value });
    } else if (type === "lname") {
      setField({ ...field, lname: event.target.value });
    } else if (type === "username") {
      setField({ ...field, username: event.target.value });
    } else if (type === "email") {
      setField({ ...field, email: event.target.value });
    } else if (type === "password") {
      setField({ ...field, password: event.target.value });
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <h1 style={{ marginTop: "0rem", color: "white" }}>Sign up</h1>

      <div class="inputtext-holder" style={{ margin: "1rem" }}>
        <input
          class="input-standard"
          style={{ width: "100%" }}
          type="text"
          placeholder="First Name"
          onChange={(event) => onChangeHandler(event, { type: "fname" })}
        ></input>
      </div>
      <div class="inputtext-holder" style={{ margin: "1rem" }}>
        <input
          class="input-standard"
          style={{ width: "100%" }}
          type="text"
          placeholder="Last Name"
          onChange={(event) => onChangeHandler(event, { type: "lname" })}
        ></input>
      </div>
      <div class="inputtext-holder" style={{ margin: "1rem" }}>
        <input
          class="input-standard"
          style={{ width: "100%" }}
          type="text"
          placeholder="Username"
          onChange={(event) => onChangeHandler(event, { type: "username" })}
        ></input>
      </div>
      <div class="inputtext-holder" style={{ margin: "1rem" }}>
        <input
          class="input-standard"
          style={{ width: "100%" }}
          type="text"
          placeholder="Email"
          onChange={(event) => onChangeHandler(event, { type: "email" })}
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

      <button onClick={SignUpHandler} class="secondary-button-blue">
        Sign Up
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
        Have an account?{" "}
        <em>
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/login"
            replace
          >
            Login in here!
          </Link>
        </em>
      </h3>
    </div>
  );
}
