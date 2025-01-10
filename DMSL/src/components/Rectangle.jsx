import React, { Component } from "react";
import "./css/Rectangle.css";

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
                            <h3>Objective:</h3>
                            {
                            Array.isArray(this.props.objective) ? 
                            <ol>
                                {this.props.objective.map((item, index) => (
                                    <li key={index}>{index+1}. {item}</li>
                                ))}
                            </ol>:
                            <p>{this.props.objective}</p>
                            }
                            
                        </>
                    )}

                    {this.props.Conclusion && (
                        <>
                            <br />
                            <h3>Conclusion:</h3>
                            {Array.isArray(this.props.Conclusion) ? 
                                <ol>
                                    {this.props.Conclusion.map((con,index)=>(
                                    <li key={index}>{index+1}. {con}</li>
                                    ))}
                                </ol>
                            : <p>{this.props.Conclusion}</p>
                            }
                            
                        </>
                    )}
                    {this.props.References && (
                        <>
                            <h3>REFERENCE BOOK:</h3>
                            {Array.isArray(this.props.References) ? 
                                <ol>
                                {this.props.References.map(
                                    (reference, index) => (
                                        <li key={index}>{index+1}. {reference}</li>
                                    )
                                )}
                                </ol>
                            : <p>{this.props.References}</p>
                            }
                            
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Rectangle;
