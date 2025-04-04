// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './css/quiz.css';
// import axios from 'axios';

// const Quiz = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [assignments, setAssignments] = useState([
//     {
//       id: 1,
//       title: "SQL Basics",
//       description: "Learn fundamental SQL queries and database concepts",
//       date: "2024-01-20", // Added date
//       quizzes: [
//         { id: 1, name: "SELECT Statements", duration: "20 mins", questions: 10, deadline: "2024-01-25" },
//         { id: 2, name: "WHERE Clause", duration: "15 mins", questions: 8, deadline: "2024-01-27" },
//       ]
//     },
//     {
//       id: 2,
//       title: "Database Design",
//       description: "Understanding database schema and relationships",
//       date: "2024-01-22", // Added date
//       quizzes: [
//         { id: 3, name: "Entity Relationships", duration: "25 mins", questions: 12, deadline: "2024-01-28" },
//         { id: 4, name: "Normalization", duration: "30 mins", questions: 15, deadline: "2024-01-30" },
//       ]
//     },
//     // Add more assignments as needed
//   ]);

//   const [selectedAssignment, setSelectedAssignment] = useState(null);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const token = localStorage.getItem('studentToken');
//         const studentData = localStorage.getItem('studentData');

//         if (!token || !studentData) {
//           console.log('No token or student data found');
//           navigate('/login');
//           return;
//         }

//         // Verify token with backend
//         const response = await axios.get('http://localhost:3000/api/students/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         if (response.data) {
//           setUser(JSON.parse(studentData));
//         } else {
//           throw new Error('Invalid authentication');
//         }
//       } catch (error) {
//         console.error('Authentication error:', error);
//         setError('Authentication failed. Please login again.');
//         localStorage.removeItem('studentToken');
//         localStorage.removeItem('studentData');
//         navigate('/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthentication();
//   }, [navigate]);

//   // Show loading state
//   if (loading) {
//     return <div className="quiz-loading">Loading...</div>;
//   }

//   // Show error state
//   if (error) {
//     return <div className="quiz-error">{error}</div>;
//   }

//   // Show login prompt if no user
//   if (!user) {
//     return <div className="quiz-unauthorized">Please login to access quizzes</div>;
//   }
//   const handleAssignmentClick = (assignment) => {
//     setSelectedAssignment(assignment);
//   };

//   const handleQuizStart = (quiz) => {
//     navigate(`/quiz/${quiz.id}`);
//   };

//   const handleBack = () => {
//     setSelectedAssignment(null);
//   };

//   // Remove this duplicate check
//   if (!user) {
//     return null;
//   }
  
//   // Keep only the earlier checks:
//   if (loading) {
//     return <div className="quiz-loading">Loading...</div>;
//   }
  
//   if (error) {
//     return <div className="quiz-error">{error}</div>;
//   }
  
//   if (!user) {
//     return <div className="quiz-unauthorized">Please login to access quizzes</div>;
//   }
  
//   return (
//     <div className="quiz-container">
//       {!selectedAssignment ? (
//         <>
//           <h2>Available Assignments</h2>
//           <div className="assignment-grid">
//             {assignments.map((assignment) => (
//               <div 
//                 key={assignment.id} 
//                 className="assignment-card"
//                 onClick={() => handleAssignmentClick(assignment)}
//               >
//                 <h3>{assignment.title}</h3>
//                 <p>{assignment.description}</p>
//                 <div className="assignment-info">
//                   <span className="date">Released: {new Date(assignment.date).toLocaleDateString()}</span>
//                   <span className="quiz-count">
//                     {assignment.quizzes.length} Quizzes Available
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="quiz-list">
//           <button className="back-button" onClick={handleBack}>
//             ← Back to Assignments
//           </button>
//           <h2>{selectedAssignment.title} Quizzes</h2>
//           <div className="quiz-grid">
//             {selectedAssignment.quizzes.map((quiz) => (
//               <div key={quiz.id} className="quiz-card">
//                 <h3>{quiz.name}</h3>
//                 <div className="quiz-details">
//                   <p>Duration: {quiz.duration}</p>
//                   <p>Questions: {quiz.questions}</p>
//                   <p className="deadline">Deadline: {new Date(quiz.deadline).toLocaleDateString()}</p>
//                 </div>
//                 <button 
//                   className="start-quiz-btn"
//                   onClick={() => handleQuizStart(quiz)}
//                 >
//                   Start Quiz
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apicalls/axios';
import QuizApp from './Quiz1';
import './css/quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get('/api/exams/active-exams');
        const exams = response.data;
        
        const transformedQuizzes = exams.map(exam => ({
          id: exam._id,
          name: exam.title,
          duration: `${exam.duration} mins`,
          questions: exam.selectedQuestions.length,
          deadline: exam.scheduledTime,
        }));
        console.log("ScheduledQuizzes:", transformedQuizzes);
        setQuizzes(transformedQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setQuizzes([]);
      }
    };

    fetchQuizzes();
  }, []);

  if (!user) return null;

  return (
    <div className="quiz-container" style={{ 
      minHeight: '100vh',
      padding: '20px'
    }}>
      {selectedExamId ? (
        // Show QuizApp when an exam is selected
        <QuizApp id={selectedExamId} />
      ) : (
        <>
          <h2>Available Quizzes</h2>
          <div className="quiz-card">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-item">
                <div className="quiz-info">
                  <h5>{quiz.name}</h5>
                  <div className="quiz-details">
                    <span>Duration: {quiz.duration}</span>
                    <span>Questions: {quiz.questions}</span>
                    <span>Scheduled time: {new Date(quiz.deadline).toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  className="start-quiz-btn"
                  onClick={() => setSelectedExamId(quiz.id)}
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
