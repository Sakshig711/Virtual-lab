import React, { useState,useEffect } from 'react';
import { Table, Tag, Modal, Card, List } from 'antd';
import './Students.css';
import axiosInstance from '../../../apicalls/axios';
function Students() {

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [students] = useState([
    {
      key: '1',
      name: 'John Doe',
      rollNo: '101',
      totalAssignments: 5,
      marks: 85,
      category: 'Excellent',
      batchRank: 3,
      classRank: 5,
      percentile: 95.5,
      assignments: [
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { name: 'SQL Queries', marks: 85, date: '2024-01-15', status: 'completed' },
        { name: 'Normalization', marks: 88, date: '2024-01-20', status: 'completed' },
        { name: 'DBMS Architecture', marks: 82, date: '2024-01-25', status: 'completed' },
        { name: 'Transaction Management', marks: 80, date: '2024-01-30', status: 'completed' },
        { name: 'Database Security', status: 'pending', dueDate: '2024-02-15' },
        { name: 'Data Recovery', status: 'pending', dueDate: '2024-02-20' },
      ]
    },
    {
      key: '2',
      name: 'Jane Smith',
      rollNo: '102',
      totalAssignments: 4,
      marks: 75,
      category: 'Good',
      assignments: [
        { name: 'Database Basics', marks: 78, date: '2024-01-10' },
        { name: 'SQL Queries', marks: 72, date: '2024-01-15' },
        { name: 'Normalization', marks: 75, date: '2024-01-20' },
        { name: 'DBMS Architecture', marks: 75, date: '2024-01-25' },
      ]
    },
  ]);

  const handleRowClick = (record) => {
    setSelectedStudent(record);
    setIsModalVisible(true);
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
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        let color = 'green';
        if (category === 'Poor') {
          color = 'red';
        } else if (category === 'Good') {
          color = 'blue';
        }
        return <Tag color={color}>{category}</Tag>;
      },
    },
  ];

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