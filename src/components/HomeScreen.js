import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginUi.css";
import logo from "./../logo.png";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useNavigate

} from "react-router-dom";
import { fontSize } from "@mui/system";
import axios from 'axios'

function Login() {
  const history = useHistory();
  // const navigate=useNavigate();



  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LoginNextPage = (username, password) => {

    const params = JSON.stringify({
      username: username,

      password: password,
    });
    axios
      .post("http://192.168.1.7:3000/login", params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        console.log('Next Page ')
        // history.push("/users");
        // navigate('/assets')

     
      })

      .catch(function (error) {
        console.log(error, "Error Password");
        alert("Oops! Wrong Password or Username!");
      });
  };
  return (
    // <form>

    <div className="main-login">
      <div className="logo">
        <img src={logo} alt="Logo" style={{ width: 250 }} />
      </div>
      <div className="form-container">
        <form className="register-form">
          {/* <div class="success-message">Success! Thank you for registering</div> */}
          {/* <label>Email address</label> */}
          <input
            type="text"
            className="form-field"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <span id="first-name-error">Please enter an email address</span> */}
          {/* <label>Password</label> */}
          <input
            type="password"
            className="form-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <p style={{ fontSize: 15 }}>Remember me</p>
          </div>
          {/* <span id="email-error">Please enter an password</span> */}
          <button
            onClick={()=>LoginNextPage(username, password)}
            className="form-field"
            type="button"
            style={{ background: "#4caf50", color: "white", cursor: "pointer" }}
          >
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
