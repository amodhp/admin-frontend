import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginUi.css";
import logo from './../logo.png';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { fontSize } from "@mui/system";

function Login() {
  const history = useHistory();

  const assetsPage = () => {
    history.push("/assets");
  };
  return (
    // <form>

    <div class="main-login">
      <div className="logo">
          <img src={logo} alt="Logo"
          style={{width:250}} />
        </div>
      <div
        class="form-container">
        <form class="register-form">
          {/* <div class="success-message">Success! Thank you for registering</div> */}
          {/* <label>Email address</label> */}
          <input type="email" class="form-field" placeholder="Enter email" />
          {/* <span id="first-name-error">Please enter an email address</span> */}
          {/* <label>Password</label> */}
          <input
            type="password"
            class="form-field"
            placeholder="Enter password"
          />
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <p style={{fontSize:15}}>Remember me</p>
          </div>
          {/* <span id="email-error">Please enter an password</span> */}
          <button  
          onClick={assetsPage} class="form-field" type="submit"
          style={{background: "#4caf50",color: "white", cursor: "pointer"}}>
            Submit
          </button>
        </form>
      </div>
    </div>

    /* <h3>Sign In</h3>
      
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div> */
    // </form>
  );
}

export default Login;
