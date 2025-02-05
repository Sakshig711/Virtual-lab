import React, { useState } from "react";
import pictlogo from "../assets/pictLogo.png";
import polygon from "../assets/poly4.svg";
import "./css/Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="frame">
      <div className="div">
        <div className="nav-bar">
          <div className="overlap-group">
            <img className="poly" alt="Polygon" src={polygon} />
            <p className="text-wrapper">
              Pune Institute Of Computer Technology
            </p>
            <p className="p">A Virtual Lab for Database Management System</p>
            <img className="pictlogo" alt="Pictlogo" src={pictlogo} />

            {/* Desktop Navigation Links */}
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/aboutus">About Us</Link>
              <Link to="/assignmentlist">Assignment List</Link>
            </div>

            {/* Mobile Hamburger Icon */}
            <button className="menu-icon" onClick={toggleMenu}>
              ☰
            </button>

            {/* Mobile Navigation Links */}
            <div
              className={`nav-links-mobile ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/">Home</Link>
              <Link to="/aboutus">About Us</Link>
              <Link to="/assignmentlist">AssignmentList</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
