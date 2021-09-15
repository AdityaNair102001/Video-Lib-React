import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = "BEARER " + token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function AuthContextProvider({ children }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(false);
  const [loginError, setLoginError] = useState(null);
  // const [showProcessLoader, setShowProcessLoader] = useState(false);

  async function loginWithCredentials(field) {
    try {
      setShowLoader(true);
      const data = field;
      console.log("Line 33", data);
      const response = await axios.post(
        "https://Video-Lib-Backend.adityanair14.repl.co/login",
        data
        // { withCredentials: true, crossDomain: true }
      );
      console.log(response);
      setShowLoader(false);
      if (response.data.success === true) {
        // cookies.set("accessToken", response.data.accessToken, {
        //   path: "/"
        // });
        localStorage.setItem("user", JSON.stringify(response.data.userFromDb));
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("loginState", true);
        setupAuthHeaderForServiceCalls(localStorage.getItem("accessToken"));
        navigate(state?.from ? state.from : "/home", { replace: true });
      } else {
        setLoginError(response.data.message);
        loginErrorHandler();
        localStorage.setItem("loginState", false);
      }
    } catch (err) {
      setShowLoader(false);
      setLoginError(err.response.data.message);
      loginErrorHandler();
      localStorage.setItem("loginState", false);
    }
  }

  function loginErrorHandler() {
    setTimeout(function () {
      setLoginError(false);
    }, 2000);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.setItem("loginState", false);
    navigate("/", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        loginWithCredentials,
        logout,
        showLoader,
        setShowLoader,
        loginError,
        setLoginError,
        setupAuthHeaderForServiceCalls
        // showProcessLoader,
        // setShowProcessLoader
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}