import React, { useState,useEffect } from 'react';
import { Table, Tag, Modal, Card, List } from 'antd';
import './Students.css';
import axiosInstance from '../../../apicalls/axios';
function Students() {

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/api/student-performance');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
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
        width={700}
      >
        {selectedStudent && (
          <List
            className="assignment-list"
            itemLayout="horizontal"
            dataSource={selectedStudent.assignments}
            renderItem={item => (
              <Card className="assignment-card" size="small">
                <div className="assignment-details">
                  <div className="assignment-name">{item.name}</div>
                  <div className="assignment-score">
                    <Tag color={item.marks >= 80 ? 'green' : item.marks >= 60 ? 'blue' : 'red'}>
                      {item.marks}%
                    </Tag>
                  </div>
                  <div className="assignment-date">{item.date}</div>
                </div>
              </Card>
            )}
          />
        )}
      </Modal>
    </div>
  );
}

export default Students;