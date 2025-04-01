// import React, { useState } from 'react';
// import AnalyticsCard from '../components/AnalyticsCard';
// import RecentSubmissions from '../components/RecentSubmissions';
// import './Dashboard.css';

// function Dashboard() {
//   const [assignmentStats] = useState({
//     title: 'Assignment Statistics',
//     stats: [
//       { label: 'Total Assignments Quiz', value: '13' },
//       { label: 'Total Students Submitted Quiz', value: '156' },
//       { label: 'Average Score', value: '43' }
//     ],
//     chartData: {
//       labels: ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4'],
//       datasets: [{
//         data: [3, 3, 4, 3],
//         backgroundColor: 'rgba(53, 162, 235, 0.7)',
//         borderColor: 'rgb(53, 162, 235)',
//         borderWidth: 1
//       }]
//     }
//   });

//   const [studentStats] = useState({
//     title: 'Student Analytics',
//     stats: [
//       { label: 'Total Students', value: '6' },
//       { label: 'Class Average', value: '73.33%' },
//       { label: 'Top Performers', value: '2' }
//     ],
//     chartData: {
//       labels: ['Excellent', 'Good', 'Can Improve'],
//       datasets: [{
//         data: [2, 4, 0],
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.8)',
//           'rgba(54, 162, 235, 0.8)',
//           'rgba(255, 159, 64, 0.8)'
//         ],
//         borderColor: [
//           'rgb(75, 192, 192)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 159, 64)'
//         ],
//         borderWidth: 1
//       }]
//     }
//   });

//   const [recentSubmissions] = useState([
//     {
//       student: 'John Doe',
//       quiz: 'Database Basics',
//       score: 85,
//       date: '2024-01-20',
//       status: 'Completed'
//     },
//     {
//       student: 'Jane Smith',
//       quiz: 'SQL Queries',
//       score: 92,
//       date: '2024-01-19',
//       status: 'Completed'
//     }
//   ]);

//   return (
//     <div className="dashboard-grid">
//       <AnalyticsCard {...assignmentStats} />
//       <AnalyticsCard {...studentStats} isPieChart={true} />
//       <RecentSubmissions submissions={recentSubmissions} />
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState,useEffect } from 'react';
import AnalyticsCard from '../components/AnalyticsCard';
import RecentSubmissions from '../components/RecentSubmissions';
import './Dashboard.css';
import axiosInstance from '../../../apicalls/axios';

function Dashboard() {
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [assignmentStats, setAssignmentStats] = useState({
    title: 'Assignment Statistics',
    stats: [
      { label: 'Total Assignments Quiz', value: '13' },
      { label: 'Total Students Submitted Quiz', value: '156' },
      { label: 'Average Score', value: '43' }
    ],
    chartData: {
      labels: [], 
      datasets: [{
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1
      }]
    }
  });
  
  
  const assignmentNameMap = {
    1: 'Assignment 1',
    2: 'Assignment 2',
    3: 'Assignment 3',
    4: 'Assignment 4',
    5: 'Assignment 5',
    6: 'Assignment 6',
    7: 'Assignment 7',
    8: 'Assignment 8',
    9: 'Assignment 9',
    10: 'Assignment 10',
    11: 'Assignment 11',
  };
  
  // Function to fetch data from backend
  const fetchAssignmentData = async () => {
    try {
      // Replace with actual API call
      const response = await  axiosInstance.get('/api/assignment-count');
      const data = response.data;
      // console.log("res",response);
      if (data.success) {
      
        const labels = data.assignments.map(item => assignmentNameMap[item.assignmentId]);
        const counts = data.assignments.map(item => item.attemptCount);
  
       
        setAssignmentStats(prevState => ({
          ...prevState,
          chartData: {
            labels, // Set the dynamic labels
            datasets: [{
              data: counts, 
              backgroundColor: 'rgba(53, 162, 235, 0.7)',
              borderColor: 'rgb(53, 162, 235)',
              borderWidth: 1
            }]
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching assignment data:', error);
    }
  };
  

  useEffect(() => {
    fetchAssignmentData();
  }, []);

  const [studentStats] = useState({
    title: 'Student Analytics',
    stats: [
      { label: 'Total Students', value: '6' },
      { label: 'Class Average', value: '73.33%' },
      { label: 'Top Performers', value: '2' }
    ],
    chartData: {
      labels: ['Excellent', 'Good', 'Can Improve'],
      datasets: [{
        data: [2, 4, 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(255, 159, 64)'
        ],
        borderWidth: 1
      }]
    }
  });
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axiosInstance.get('/api/recent-submissions');
        setRecentSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching recent submissions:', error);
      } 
    };

    fetchSubmissions();
  }, []);
  // const [recentSubmissions] = useState([
  //   {
  //     student: 'John Doe',
  //     quiz: 'Database Basics',
  //     score: 85,
  //     date: '2024-01-20',
  //     status: 'Completed'
  //   },
  //   {
  //     student: 'Jane Smith',
  //     quiz: 'SQL Queries',
  //     score: 92,
  //     date: '2024-01-19',
  //     status: 'Completed'
  //   }
  // ]);

  return (
    <div className="dashboard-grid">
      <AnalyticsCard {...assignmentStats} />
      <AnalyticsCard {...studentStats} isPieChart={true} />
      <RecentSubmissions submissions={recentSubmissions} />
    </div>
  );
}

export default Dashboard;