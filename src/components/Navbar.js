import React, { useState } from "react";
import "../styles/navbar.css";
import logo from './../logo.png';

export default function Navbar() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
    <nav className="main-nav">
        <div className="logo">
          <img src={logo} alt="Logo"
          style={{width:100}} />
        </div>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li class="nav-item active">
            <a class="nav-link" href="/users">
            Users
            </a>
              {/* <NavLink class="nav-link" to="/users"></NavLink> */}
            </li>
            <li class="nav-item active">
            <a class="nav-link" href="/assets">
              Assets
            </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        Selec
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/users">
              Users 
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/assets">
              Assets
            </a>
          </li>
        </ul>
      </div>
    </nav> */}
    </>
    
  );
}
