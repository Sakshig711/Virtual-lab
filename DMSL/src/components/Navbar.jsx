  import "./Navbar.css";
  import {Link} from "react-router-dom";
  import React, { useState } from 'react';

  import {FaBars, FaTimes} from "react-icons/fa";
  import logo from '/src/assets/pictLogo.png';

  const Navbar = () => {
    const [click, SetClick] = useState(false);
    const handleClick = () => SetClick(!click); 

    const [color , setColor] = useState(false);
    const changeColor = () => {
      if(window.scrollY >= 1){
        setColor(true);
      }
      else{
        setColor(false);
      }
    };

    window.addEventListener("scroll" , changeColor);


    return (
      <div className= {color ? "header header-bg":"header"}>
          <Link to = "/">
          <div className="logo-container"> 
            <img src={logo} alt="Logo" className="logo" />
            <h1>Pune Institute Of Computer Technology</h1>
          </div>
          </Link>
      <ul className= {click ? "nav-menu active" : "nav-menu"}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/project  ">Project</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (<FaTimes size = {20} style = {{ color : "#fff"}}/>) : (<FaBars size = {20} style = {{ color : "#fff"}}/>)}
        
        
      </div>
      </div>
    );
  };

  export default Navbar;