import React, { useState } from "react";
import "../styles/navbar.css";
import logo from "./../logo.png";
import AddWork from "./AddWork";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [showAddWork, setShowAddWork] = useState(false);
  const handleShowAddWork = () => setShowAddWork(true);
  const navigate = useNavigate();
  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  }

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

          <li className="nav-item active">
              <Link to="/Dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item active">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
            <li className="nav-item active">
              <Link to="/assets" className="nav-link">Assets</Link>
            </li>
            <li className="nav-item active">
              <Link to="/logs" className="nav-link">Logs</Link>
            </li>
            <li className="nav-item active">
              <Link to="/requets" className="nav-link">Requests</Link>
            </li>
          </ul>
        </div>
        <div className="add-work">
          <button
          onClick={handleShowAddWork}
          >
           <span>+</span>Add Work
          </button>

        </div>
        <button onClick={handleSignOut} style={{position: "absolute", right:"0", marginTop:"6rem", padding:"4px"}}>Sign Out</button>
      </nav>
      
      <AddWork 
      setShow={setShowAddWork}
      show={showAddWork}
      />
      </>
      )
        }
        
  
    
  
