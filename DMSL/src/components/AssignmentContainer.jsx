import React from 'react';
import './AssignmentContainer.css';

const AssignmentContainer = () => {
  const assignments = [
    { id: 1, title: "Assignment no.1", aim: "To Study & Compare with suitable example various SQL database systems." },
    { id: 2, title: "Assignment no.2", aim: "Install and configure client and server for MySQL(Show all commands and necessary steps for installationand configuration)" },
    { id: 3, title: "Assignment no.3", aim: "Study the SQLite database and its uses and installation." },
    { id: 4, title: "Assignment no.4", aim: "Design &amp; Develop DB for “Order Management System”with all the constraints." },
    { id: 5, title: "Assignment no.5", aim: "Design &amp; Develop DB for “Order Management System” with all the constraints." },
    { id: 6, title: "Assignment no.6", aim: "Write and execute PL/SQL block to implement all types of triggers on above DB. (Consider row level and statementlevel triggers)." },
    { id: 7, title: "Assignment no.7a", aim: "Manage Data into the above tables using Insert,Select, Update, Delete DML SQL queries." },
    { id: 8, title: "Assignment no.7b-1", aim: "AIM: Create stored functions to validate data." },
    { id: 9, title: "Assignment no.7b-2", aim: "Create stored procedures to populate tables." },
    { id: 10, title: "Assignment no.8", aim: "Implement cursors in PL/SQL for various applications.." },
    { id: 11, title: "Assignment no.9", aim: "Design and implement database triggers for the above DB." },
    { id: 12, title: "Assignment no.10", aim: "Implement views in SQL to simplify complex queries on the above DB." },
    { id: 13, title: "Assignment no.11", aim: "Implement index structures to optimize query performance on the above DB." },
    { id: 14, title: "Assignment no.12", aim: "Perform backup and restore operations on the above DB." },
    
    
  ];

  return (
    <div className="assignment-container">
      <div className="scrolling-wrapper">
        {assignments.map((assignment) => (
          <div className="scrolling-card" key={assignment.id}>
            <h4 className="assignment-title">{assignment.title}</h4>
            <p className="assignment-aim">{assignment.aim}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentContainer;
