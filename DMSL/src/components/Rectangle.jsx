import React, { Component } from "react";
import "./Rectangle.css";

class Rectangle extends Component {
    render() {
        return (
            <div className="rectangle-container">
                <div className="rectangle-content">
                    {this.props.Aim && (
                        <>
                            <h3>Aim:</h3>
                            <p>{this.props.Aim}</p>
                        </>
                    )}
                    {this.props.problemStatement && (
                        <>
                            <h3>Problem Statement:</h3>
                            <p>{this.props.problemStatement}</p>
                        </>
                    )}
                    {this.props.objective && (
                        <>
                            {console.log(this.props.objective)}
                            <h3>Objective:</h3>
                            <ol>
                                {this.props.objective.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ol>
                        </>
                    )}

                    {this.props.Conclusion && (
                        <>
                            <h3>Conclusion:</h3>
                            <p>{this.props.Conclusion}</p>
                        </>
                    )}
                    {this.props.References && (
                        <>
                            <h3>REFERENCE BOOK:</h3>
                            <ul>
                                {this.props.References.map(
                                    (reference, index) => (
                                        <li key={index}>{reference}</li>
                                    )
                                )}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Rectangle;
