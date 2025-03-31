import React from 'react';
import './RecentSubmissions.css';

const RecentSubmissions = ({ submissions }) => {
  return (
    <div className="recent-submissions">
      <h3>Recent Quiz Submissions</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Quiz</th>
              <th>Score</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td>{submission.student}</td>
                <td>{submission.quiz}</td>
                <td className={`score ${submission.score >= 70 ? 'good' : 'poor'}`}>
                  {submission.score}%
                </td>
                <td>{submission.date}</td>
                <td>
                  <span className={`status ${submission.status.toLowerCase()}`}>
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSubmissions;