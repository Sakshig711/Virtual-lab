import React from "react";
import pictlogo from '../assets/pictlogo.png';
import polygon from '../assets/poly4.svg';
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="frame">
          <div className="div">
            <div className="nav-bar">
              <div className="overlap-group">
               {/* <img className="polygon" alt="Polygon" src={polygon3} />
                <img className="img" alt="Polygon" src={polygon2} />   */}
                <img className="poly" alt="Polygon" src ={polygon} />
                <p className="text-wrapper">Pune Institute Of Computer Technology</p>
                <p className="p">A Virtual Lab for Database Management System</p>
                <img className="pictlogo" alt="Pictlogo" src={pictlogo} />

                <div className="nav-links">
                  <Link to="/">Home</Link>
                  <Link to="/aboutus">About Us</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Nav