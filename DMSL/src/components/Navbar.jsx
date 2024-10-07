import "./Navbar.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from '/src/assets/pictLogo.png';

const Navbar = ({ alwaysDark }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setColor] = useState(alwaysDark || false);

  const changeColor = () => {
    if (window.scrollY >= 1) {
      setColor(true);
    } else if (!alwaysDark) {
      setColor(false);
    }
  };

  useEffect(() => {
    if (!alwaysDark) {
      window.addEventListener("scroll", changeColor);
    }
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, [alwaysDark]);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
       {/* <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Pune Institute Of Computer Technology</h1>
        </div>
        */}
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/project">Project</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;