
import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Card, List, Select, Spin } from 'antd';
import './Students.css';
import axiosInstance from '../../../apicalls/axios';

const { Option } = Select;

function Students() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/api/student-performance');
        setStudents(response.data);
        setFilteredStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = students;

    if (selectedClass) {
      filtered = filtered.filter(student => student.class === selectedClass);
    }

    if (selectedBatch) {
      filtered = filtered.filter(student => student.batch === selectedBatch);
    }

    setFilteredStudents(filtered);
  }, [selectedClass, selectedBatch, students]);

  const handleRowClick = (record) => {
    setSelectedStudent(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Roll No.', dataIndex: 'rollNo', key: 'rollNo' },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { title: 'Batch', dataIndex: 'batch', key: 'batch' },
    { title: 'Total Assignments', dataIndex: 'totalAssignments', key: 'totalAssignments' },
    { title: 'Marks', dataIndex: 'marks', key: 'marks' },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        let color = 'green';
        if (category === 'Poor') color = 'red';
        else if (category === 'Good') color = 'blue';
        return <Tag color={color}>{category}</Tag>;
      },
    },
  ];

  return (
    <div className="students-container">
      <h2>Student Performance Dashboard</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Select
          placeholder="Filter by Class"
          onChange={value => setSelectedClass(value)}
          allowClear
          style={{ width: 200 }}
        >
          {['FE', 'SE', 'TE', 'BE'].map(cls => (
            <Option key={cls} value={cls}>{cls}</Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Batch"
          onChange={value => setSelectedBatch(value)}
          allowClear
          style={{ width: 200 }}
        >
          {['L1', 'L2', 'L3', 'L4'].map(batch => (
            <Option key={batch} value={batch}>{batch}</Option>
          ))}
        </Select>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table 
          columns={columns}
          dataSource={filteredStudents}
          rowKey="rollNo"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            className: 'clickable-row'
          })}
        />
      )}

      <Modal
        title={`Assignment Details - ${selectedStudent?.name}`}
        open={isModalVisible}
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
