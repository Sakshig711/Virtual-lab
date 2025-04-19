import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/StudentDashboard.css';
import { Card, Row, Col, Progress, message } from 'antd';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function StudentDashboard() {
  const [userData, setUserData] = useState(null);
  const [examStats, setExamStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/students/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data.studentInfo);
        setExamStats(response.data.examStats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        message.error('Failed to load profile data');
        if (error.response?.status === 401) {
          localStorage.removeItem('studentToken');
          localStorage.removeItem('studentData');
          navigate('/login');
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
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
            <h3>Attempted Exams</h3>
            {examStats?.scheduledExams.map(exam => (
              <div key={exam.id} className="quiz-item">
                <span className="quiz-name">{exam.title}</span>
                <span className="quiz-score">Score: {exam.percentage}%</span>
                <span className="quiz-date">Date: {new Date(exam.attemptedOn).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
          <div className="remaining-quizzes">
            <h3>Completed Assignments</h3>
            {examStats?.assignments.map(assignment => (
              <div key={assignment.id} className="quiz-item">
                <span className="quiz-name">{assignment.title}</span>
                <span className="quiz-score">Score: {assignment.percentage}%</span>
                <span className="quiz-date">Date: {new Date(assignment.attemptedOn).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentData');
    message.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Welcome, {userData?.name}!</h1>
        <p>Track your progress and manage your learning journey</p>
      </div>

      <Row gutter={[16, 16]} className="dashboard-stats">
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card" onClick={() => setShowQuizDetails(true)} style={{ cursor: 'pointer' }} loading={loading}>
            <h3>Exam Progress</h3>
            <div className="quiz-progress">
              <div className="progress-item">
                <span>Total Exams</span>
                <span className="progress-value">{examStats?.totalScheduledExams || 0}</span>
              </div>
              <div className="progress-item">
                <span>Total Assignments</span>
                <span className="progress-value">{examStats?.totalAssignments || 0}</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card" loading={loading}>
            <h3>Overall Score</h3>
            <Progress 
              type="circle" 
              percent={Number(examStats?.overallScore || 0)} 
              strokeColor="#52c41a"
              format={percent => `${percent}%`}
            />
            <p>Keep up the good work!</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <Card className="stat-card" loading={loading}>
            <h3>Recent Performance</h3>
            <div className="comparison-stats">
              {examStats?.scheduledExams.slice(-3).map((exam, index) => (
                <div key={exam.id} className="comparison-item">
                  <span>{exam.title}</span>
                  <Progress percent={Number(exam.percentage)} status="normal" />
                </div>
              ))}
              {examStats?.assignments.slice(-2).map(assignment => (
                <div key={assignment.id} className="comparison-item">
                <span>{assignment.title}</span>
                <Progress percent={Number(assignment.percentage)} status="normal" />
              </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard-details">
        <Col xs={24} lg={12}>
          <Card title="Personal Information" className="info-card" loading={loading}>
            <p><strong>Roll Number:</strong> {userData?.rollNumber}</p>
            <p><strong>Class:</strong> {userData?.class}</p>
            <p><strong>Batch:</strong> {userData?.batch}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
          </Card>
        </Col>
        {/* <Col xs={24} lg={12}>
          <Card title="Recent Activity" className="activity-card" loading={loading}>
            <ul>
              {examStats?.scheduledExams.slice(-3).map(exam => (
                <li key={exam.id}>
                  Completed {exam.title} with {exam.percentage}%
                </li>
              ))}
              {examStats?.assignments.slice(-2).map(assignment => (
                <li key={assignment.id}>
                  Submitted {assignment.title} with {assignment.percentage}%
                </li>
              ))}
            </ul>
          </Card>
        </Col> */}
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
          <button onClick={() => navigate('/')} className="action-button">
            Home
          </button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <button onClick={handleLogout} className="action-button logout">
            Logout
          </button>
        </Col>
      </Row>

      <QuizDetailsModal />
    </div>
  );
}

export default StudentDashboard;