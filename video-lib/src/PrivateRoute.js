import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import axios from "axios";

async function getData(path, setLogin) {
  try {
    console.log("Hwader at 12", header);
    console.log("token at 11", token);
    const token = localStorage.getItem("accessToken");
    const header = "BEARER " + token;

    const response = await axios.get(
      "https://Video-Lib-Backend.adityanair14.repl.co" + path,
      {
        headers: {
          Authorization: header
        }
      }
    );
    console.log("response at 18", response);
    if (response.data.success === true) {
      localStorage.setItem("loginState", true);
    } else {
      localStorage.setItem("loginState", false);
    }
  } catch (err) {
    console.log(err);
  }
}

export function PrivateRoute({ path, ...props }) {
  const { setLogin, login } = useContext(AuthContext);
  // getData(path, setLogin);
  console.log(login);
  return localStorage.getItem("accessToken") ? (
    <Route path={path} {...props}></Route>
  ) : (
    <Navigate state={{ from: path }} replace={true} to="/login" />
  );
}
