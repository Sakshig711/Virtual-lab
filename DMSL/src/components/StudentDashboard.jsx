import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/StudentDashboard.css';

function StudentDashboard() {
  const [userData, setUserData] = useState(null);
  const [quizStats, setQuizStats] = useState({
    attempted: 0,
    remaining: 5,
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

  return (
    <div className="student-dashboard">
      <div className="profile-section">
        <h2>Student Profile</h2>
        {userData && (
          <div className="profile-details">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Roll Number:</strong> {userData.rollNo}</p>
            <p><strong>Class:</strong> {userData.class}</p>
            <p><strong>Batch:</strong> {userData.batch}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        )}
      </div>

      <div className="quiz-statistics">
        <h3>Quiz Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Quiz Progress</h4>
            <p style={{color: '#243457', fontWeight: '500'}}>
              Attempted: {quizStats.attempted}
            </p>
            <p style={{color: '#243457', fontWeight: '500'}}>
              Remaining: {quizStats.remaining}
            </p>
          </div>
          
          <div className="stat-card">
            <h4>Your Percentile</h4>
            <div className="percentile">
              <span className="percentage">{quizStats.percentile}%</span>
            </div>
          </div>

          <div className="stat-card">
            <h4>Class Rankings</h4>
            <div className="comparison">
              <div className="rank-item">
                <span className="rank-label">Your Rank</span>
                <span className="rank-value">#5</span>
              </div>
              <div className="rank-item">
                <span className="rank-label">In Batch (L3)</span>
                <span className="rank-value">#2</span>
              </div>
              <div className="rank-item">
                <span className="rank-label">In Class (TE)</span>
                <span className="rank-value">#15</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-options">
        <h3>Dashboard Options</h3>
        <div className="options-grid">
          <button onClick={() => navigate('/assignments')}>Assignments</button>
          <button onClick={() => navigate('/quizzes')}>Quizzes</button>
          <button onClick={() => navigate('/results')}>Results</button>
          <button onClick={() => navigate('/profile')}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;