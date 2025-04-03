import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quizzes] = useState([
    { id: 1, name: "SELECT Statements", duration: "20 mins", questions: 10, deadline: "2024-01-25" },
    { id: 2, name: "WHERE Clause", duration: "15 mins", questions: 8, deadline: "2024-01-27" },
    { id: 3, name: "Entity Relationships", duration: "25 mins", questions: 12, deadline: "2024-01-28" },
    { id: 4, name: "Normalization", duration: "30 mins", questions: 15, deadline: "2024-01-30" },
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleQuizStart = (quiz) => {
    navigate(`/quiz/${quiz.id}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="quiz-container">
      <h2>Available Quizzes</h2>
      <div className="quiz-card">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <div className="quiz-info">
              <h5>{quiz.name}</h5>
              <div className="quiz-details">
                <span>Duration: {quiz.duration}</span>
                <span>Questions: {quiz.questions}</span>
                <span>Deadline: {new Date(quiz.deadline).toLocaleDateString()}</span>
              </div>
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
  );
};

export default Quiz;