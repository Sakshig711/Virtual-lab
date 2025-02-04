import React from "react";
import { useNavigate } from "react-router-dom";
import './css/AssignmentList.css'

function AssignmentListCard({ id, aim, title }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/practical/${id}`,{ state: { id } });
    };

    return (
        <div className="Card">
            <div className="Box" onClick={handleClick}>
                <h3>{title}</h3>
                <p>{aim}</p>
            </div>
        </div>
    );
}

export default AssignmentListCard;