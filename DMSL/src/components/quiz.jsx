import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "SQL Basics",
      description: "Learn fundamental SQL queries and database concepts",
      date: "2024-01-20", // Added date
      quizzes: [
        { id: 1, name: "SELECT Statements", duration: "20 mins", questions: 10, deadline: "2024-01-25" },
        { id: 2, name: "WHERE Clause", duration: "15 mins", questions: 8, deadline: "2024-01-27" },
      ]
    },
    {
      id: 2,
      title: "Database Design",
      description: "Understanding database schema and relationships",
      date: "2024-01-22", // Added date
      quizzes: [
        { id: 3, name: "Entity Relationships", duration: "25 mins", questions: 12, deadline: "2024-01-28" },
        { id: 4, name: "Normalization", duration: "30 mins", questions: 15, deadline: "2024-01-30" },
      ]
    },
    // Add more assignments as needed
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleQuizStart = (quiz) => {
    navigate(`/quiz/${quiz.id}`);
  };

  const handleBack = () => {
    setSelectedAssignment(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="quiz-container">
      {!selectedAssignment ? (
        <>
          <h2>Available Assignments</h2>
          <div className="assignment-grid">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="assignment-card"
                onClick={() => handleAssignmentClick(assignment)}
              >
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <div className="assignment-info">
                  <span className="date">Released: {new Date(assignment.date).toLocaleDateString()}</span>
                  <span className="quiz-count">
                    {assignment.quizzes.length} Quizzes Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-list">
          <button className="back-button" onClick={handleBack}>
            ← Back to Assignments
          </button>
          <h2>{selectedAssignment.title} Quizzes</h2>
          <div className="quiz-grid">
            {selectedAssignment.quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card">
                <h3>{quiz.name}</h3>
                <div className="quiz-details">
                  <p>Duration: {quiz.duration}</p>
                  <p>Questions: {quiz.questions}</p>
                  <p className="deadline">Deadline: {new Date(quiz.deadline).toLocaleDateString()}</p>
                </div>
                <button 
                  className="start-quiz-btn"
                  onClick={() => handleQuizStart(quiz)}
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;