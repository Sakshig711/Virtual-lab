import React, { Component } from 'react';
import './Rectangle.css';

class Rectangle extends Component{
  render(){
    return (
      <div className="rectangle-container">
        <div className="rectangle-content">
         
          <h3>Aim:</h3>
          <p>{this.props.Aim}</p>
          <h3>Problem Statement:</h3>
          <p>{this.props.problemStatement}</p>
          <h3>Objective:</h3>
          <p>{this.props.Objective}</p>
          <h3>Conclusion:</h3>
          <p>{this.props.Conclusion}</p>
        </div>
      </div>
    );
  }
}
  
export default Rectangle;
