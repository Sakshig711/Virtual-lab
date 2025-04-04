import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Card, List, message } from 'antd';
import axios from 'axios';
import './Students.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Students() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${BASE_URL}/api/student-performance`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch student data');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Roll No.',
      dataIndex: 'rollNo',
      key: 'rollNo',
    },
    {
      title: 'Total Assignments',
      dataIndex: 'totalAssignments',
      key: 'totalAssignments',
    },
    {
      title: 'Marks',
      dataIndex: 'marks',
      key: 'marks',
      render: (marks) => `${marks}%`
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        let color = category === 'Excellent' ? 'green' : 
                    category === 'Good' ? 'blue' : 'red';
        return <Tag color={color}>{category}</Tag>;
      },
    },
  ];

  const handleRowClick = (record) => {
    setSelectedStudent(record);
    setIsModalVisible(true);
  };

  return (
    <div className="students-container">
      <h2>Student Performance Dashboard</h2>
      <Table 
        columns={columns} 
        dataSource={students} 
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          className: 'clickable-row'
        })}
      />

      <Modal
        title={`Assignment Details - ${selectedStudent?.name}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedStudent && (
          <>
            <div className="performance-overview">
              <Card className="overview-card">
                <div className="overview-item">
                  <span className="label">Overall Percentile</span>
                  <span className="value">{selectedStudent.percentile}%</span>
                </div>
                <div className="overview-item">
                  <span className="label">Batch Rank</span>
                  <span className="value">#{selectedStudent.batchRank}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Class Rank</span>
                  <span className="value">#{selectedStudent.classRank}</span>
                </div>
              </Card>
            </div>

            <div className="quiz-summary">
              <Card className="summary-card">
                <div className="summary-item">
                  <span>Attempted Quizzes</span>
                  <span className="count completed">{selectedStudent.assignments.filter(a => a.status === 'completed').length}</span>
                </div>
                <div className="summary-item">
                  <span>Pending Quizzes</span>
                  <span className="count pending">{selectedStudent.assignments.filter(a => a.status === 'pending').length}</span>
                </div>
              </Card>
            </div>
            <div className="assignment-sections">
              <h3>Completed Assignments</h3>
              <List
                className="assignment-list"
                itemLayout="horizontal"
                dataSource={selectedStudent.assignments.filter(a => a.status === 'completed')}
                renderItem={item => (
                  <Card className="assignment-card" size="small">
                    <div className="assignment-details">
                      <div className="assignment-header">
                        <div className="assignment-name">{item.name}</div>
                        <Tag color={item.marks >= 80 ? 'green' : item.marks >= 60 ? 'blue' : 'red'}>
                          {item.marks}%
                        </Tag>
                      </div>
                      <div className="comparative-analysis">
                        <div className="analysis-item">
                          <span>Your Score: {item.marks}%</span>
                          <span>Batch Avg: {item.batchAvg}%</span>
                          <span>Class Avg: {item.classAvg}%</span>
                        </div>
                        <div className="percentile">
                          Percentile: <span className="highlight">{item.percentile}%</span>
                        </div>
                      </div>
                      <div className="assignment-footer">
                        <span>Submitted: {item.date}</span>
                      </div>
                    </div>
                  </Card>
                )}
              />

              <h3>Pending Assignments</h3>
              <List
                className="assignment-list"
                itemLayout="horizontal"
                dataSource={selectedStudent.assignments.filter(a => a.status === 'pending')}
                renderItem={item => (
                  <Card className="assignment-card pending-card" size="small">
                    <div className="assignment-details">
                      <div className="assignment-name">{item.name}</div>
                      <div className="assignment-date">Due: {item.dueDate}</div>
                      <Tag color="orange">Pending</Tag>
                    </div>
                  </Card>
                )}
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Students;