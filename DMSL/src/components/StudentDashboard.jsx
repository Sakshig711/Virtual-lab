import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/StudentDashboard.css';
import { Card, Row, Col, Progress } from 'antd';

function StudentDashboard() {
  const [userData, setUserData] = useState(null);
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const [quizData] = useState({
    attempted: [
      { id: 1, name: 'Quiz 1', score: '85%', date: '2024-01-15' },
      { id: 2, name: 'Quiz 2', score: '90%', date: '2024-01-20' },
      { id: 3, name: 'Quiz 3', score: '88%', date: '2024-01-25' },
    ],
    remaining: [
      { id: 4, name: 'Quiz 4', dueDate: '2024-02-10' },
      { id: 5, name: 'Quiz 5', dueDate: '2024-02-15' },
    ]
  });
  const [quizStats, setQuizStats] = useState({
    attempted: 3,
    remaining: 2,
    percentile: 85,
    batchAvg: 75,
    classAvg: 70
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      setUserData(user);
    }
  }, [navigate]);

  const QuizDetailsModal = () => (
    <div className={`quiz-details-modal ${showQuizDetails ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Quiz Progress Details</h2>
          <button onClick={() => setShowQuizDetails(false)} className="close-button">&times;</button>
        </div>
        <div className="quiz-lists">
          <div className="attempted-quizzes">
            <h3>Attempted Quizzes</h3>
            {quizData.attempted.map(quiz => (
              <div key={quiz.id} className="quiz-item">
                <span className="quiz-name">{quiz.name}</span>
                <span className="quiz-score">Score: {quiz.score}</span>
                <span className="quiz-date">Date: {quiz.date}</span>
              </div>
            ))}
          </div>
          <div className="remaining-quizzes">
            <h3>Remaining Quizzes</h3>
            {quizData.remaining.map(quiz => (
              <div key={quiz.id} className="quiz-item">
                <span className="quiz-name">{quiz.name}</span>
                <span className="quiz-due">Due: {quiz.dueDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Welcome, {userData?.name}!</h1>
        <p>Track your progress and manage your learning journey</p>
      </div>

      <Row gutter={[16, 16]} className="dashboard-stats">
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card" onClick={() => setShowQuizDetails(true)} style={{ cursor: 'pointer' }}>
            <h3>Quiz Progress</h3>
            <div className="quiz-progress">
              <div className="progress-item">
                <span>Attempted</span>
                <span className="progress-value">{quizData.attempted.length}</span>
              </div>
              <div className="progress-item">
                <span>Remaining</span>
                <span className="progress-value">{quizData.remaining.length}</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card">
            <h3>Your Percentile</h3>
            <Progress 
              type="circle" 
              percent={quizStats.percentile} 
              strokeColor="#52c41a"
              format={percent => `${percent}th`}
            />
            <p>Keep up the good work!</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <Card className="stat-card">
            <h3>Comparative Analysis</h3>
            <div className="comparison-stats">
              <div className="comparison-item">
                <span>Your Score</span>
                <Progress percent={quizStats.percentile} status="active" />
              </div>
              <div className="comparison-item">
                <span>Batch Average</span>
                <Progress percent={quizStats.batchAvg} status="normal" />
              </div>
              <div className="comparison-item">
                <span>Class Average</span>
                <Progress percent={quizStats.classAvg} status="normal" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard-details">
        <Col xs={24} lg={12}>
          <Card title="Personal Information" className="info-card">
            <p><strong>Roll Number:</strong> {userData?.rollNo}</p>
            <p><strong>Class:</strong> {userData?.class}</p>
            <p><strong>Batch:</strong> {userData?.batch}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity" className="activity-card">
            <ul>
              <li>Completed Quiz 3</li>
              <li>Scored 90% in Quiz 2</li>
              <li>Started Quiz 1</li>
              <li>Updated Profile</li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="quick-actions">
        <Col xs={24} sm={12} md={6}>
          <button onClick={() => navigate('/quiz')} className="action-button">
            Take Quiz
          </button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <button onClick={() => navigate('/results')} className="action-button">
            View Results
          </button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <button onClick={() => navigate('/profile')} className="action-button">
            Edit Profile
          </button>
        </Col>
      </Row>
      
      <QuizDetailsModal />
    </div>
  );
}

export default StudentDashboard;