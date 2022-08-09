import React, { useState } from "react";
import "../styles/navbar.css";
import logo from "./../logo.png";

export default function Navbar() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
     <>
      <nav className="main-nav">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ width: 100 }} />
        </div>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>

          <li class="nav-item active">
              <a class="nav-link" href="/Dashboard">
                Dashboard
              </a>
              {/* <NavLink class="nav-link" to="/users"></NavLink> */}
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/users">

                Users
              </a>
              {/* <NavLink className="nav-link" to="/users"></NavLink> */}
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/assets">
                Assets
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/logs">
                Logs
              </a>
            </li>
          </ul>
        </div>
      </nav>
      </>
      )
        }
        
  
    
  
