import "../styles.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useContext, useRef, useState } from "react";
import logo from "../netruh.gif";
import loading from "../loginLoader.gif";

export function LandingPage() {
  const [field, setField] = useState({});

  const logoRef = useRef("");

  const {
    loginWithCredentials,

    showLoader,

    loginError,
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
    <div
      style={{ margin: "auto", backgroundColor: "black", minHeight: "100%" }}
    >
      <div style={{}} className="wrapper-landingpage">
        {/* <img src="https://media.istockphoto.com/vectors/phoenix-logo-vector-id1086955338?k=6&m=1086955338&s=612x612&w=0&h=hE_76b0Y11r9Hz2HH3QCK2TGq7TO-01M6Kr3EMDjdds=" /> */}

        {/* <Logo></Logo> */}

        <img
          onMouseEnter={() => {
            // logoRef.current.style.boxShadow =
            //   "rgb(119 14 240 / 95%) 0px 0px 20px 5px";
            logoRef.current.style.boxShadow =
              "rgb(255 255 255 / 95%) 0px 0px 16px 6px";
            logoRef.current.style.border = "none";
          }}
          onMouseLeave={() => {
            // logoRef.current.style.boxShadow =
            //   "rgb(255 255 255 / 95%) 0px 0px 16px 6px";
            logoRef.current.style.boxShadow = "0 0 0 0";
            logoRef.current.style.border = "1px white solid";
          }}
          ref={logoRef}
          alt="logo here"
          className="landing-logo"
          src={logo}
          width="400rem"
          // height="400rem"
        />

        <div>
          <Link to="/home">
            <button
              class="secondary-button-blue"
              style={{
                backgroundColor: "white",
                color: "black",
                margin: "auto",
                marginTop: "2rem",
                boxShadow: "rgb(252 252 252) 0px 0px 11px 0px",
              }}
            >
              Browse!
            </button>
          </Link>
        </div>

        <h2
          style={{
            color: "white",
            fontFamily: "sans-serif",
            marginTop: "2.5rem",
          }}
        >
          Login
        </h2>

        <div class="inputtext-holder" style={{ margin: "1rem" }}>
          <input
            class="input-standard"
            // className="input-standard"
            type="text"
            placeholder="Username"
            onChange={(event) => onChangeHandler(event, { type: "username" })}
          ></input>
        </div>
        <div class="inputtext-holder" style={{ margin: "1rem" }}>
          <input
            class="input-standard"
            // className="input-standard"
            type="password"
            placeholder="Password"
            onChange={(event) => onChangeHandler(event, { type: "password" })}
          ></input>
        </div>
        {/* 
        <div
          style={{
            height: "42px",
            backgroundColor: "white",
            background:
              "linear-gradient(to top, rgb(249, 249, 251) 0%, rgb(51, 51, 51) 100%)",
            width: "10rem",
            margin: "auto",
            clipPath:
              "polygon(25px 0%, calc(100% - 25px) 0%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <button
          class="primary-button-blue"
          style={{ background: "white", color: "black", border: "none" }}
          onClick={LoginHandler}
        >
          Login
        </button> */}

        <div style={{ marginTop: "1rem" }}>
          <button class="pulse" onClick={() => LoginHandler()}>
            Login!
          </button>
        </div>

        <div>{showLoader ? <img alt="Signing in.." src={loading} /> : ""}</div>

        {loginError ? (
          <div style={{}} className="alert">
            <span style={{}} class="alertText">
              {loginError}
            </span>
          </div>
        ) : (
          <div style={{ marginTop: "1.5rem" }}></div>
          // <div
          //   style={{ visibility: "hidden", position: "absolute" }}
          //   className="alert"
          //   hidden
          // >
          //   <span style={{}} class="alertText">
          //     {loginError}
          //   </span>
          // </div>
        )}

        <h3
          style={{
            marginBlock: "0rem",
            paddingBottom: "1rem",
            color: "white",
            // marginTop: "1rem",
          }}
        >
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
    </div>
  );
}
