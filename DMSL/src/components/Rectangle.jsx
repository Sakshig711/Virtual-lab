import React, { Component } from "react";
import "./css/Rectangle.css";

class Rectangle extends Component {
    render() {
        return (
            <div className="rectangle-container">
                <div className="rectangle-content">
                    {this.props.Aim && (
                        <>
                            <h2 style={{textAlign:"center"}}>{this.props.title}</h2>
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
                            <h3 className="reference-title">REFERENCE BOOK:</h3>
<div className="reference-links">
    <a 
        href="https://drive.google.com/file/d/1S-UvNXFAqigA84oCGriNZO4y7aU4KHXn/view?usp=sharing" 
        target="_blank" 
        className="reference-link"
    >
        Raghu Ramkrishnan Database Management Systems. 2nd Ed
    </a>
    <a 
        href="https://drive.google.com/file/d/1H4BVCFVoJZFmEijit1yNQofHsKaV-awj/view?usp=sharing" 
        target="_blank" 
        className="reference-link"
    >
        DATABASE MANAGEMENT SYSTEMS
    </a>
    <a 
        href="https://drive.google.com/file/d/1wrNjZ-wsL1dLXXwrZ905Mf2Tfot-rIe3/view?usp=sharing" 
        target="_blank" 
        className="reference-link"
    >
        Database_Systems by Navathe original book
    </a>
    
    {Array.isArray(this.props.References) ? (
        <ol className="custom-ol">
            {this.props.References.map((reference, index) => (
                <li key={index} className="custom-li">{index + 1}. {reference}</li>
            ))}
        </ol>
    ) : (
        <p className="custom-p">{this.props.References}</p>
    )}
</div>

                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Rectangle;
