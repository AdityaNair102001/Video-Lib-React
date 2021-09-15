import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import { AuthContextProvider } from "./AuthProvider";

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
