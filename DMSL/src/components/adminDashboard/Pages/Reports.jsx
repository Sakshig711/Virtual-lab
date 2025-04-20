

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Modal, Table, Spin } from 'antd';
import { TrophyOutlined, LikeOutlined, FrownOutlined } from '@ant-design/icons';
import './Reports.css';
import axiosInstance from '../../../apicalls/axios'; // Adjust path as needed

function Reports() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studentData, setStudentData] = useState({ excellent: [], good: [], poor: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axiosInstance.get('api/student-performance');
        const students = response.data;

        const categorized = {
          excellent: [],
          good: [],
          poor: [],
        };

        const seen = new Set(); // To ensure unique entries by rollNo

        students.forEach(student => {
          if (seen.has(student.rollNo)) return;
          seen.add(student.rollNo);

          const formattedStudent = {
            rollNo: student.rollNo,
            name: student.name,
            completed: `Assignments: ${student.assignmentsCompleted} | Exams: ${student.scheduledExamsCompleted}`,
          };

          switch (student.category) {
            case 'Category A':
              categorized.excellent.push(formattedStudent);
              break;
            case 'Category B':
              categorized.good.push(formattedStudent);
              break;
            case 'Category C':
              categorized.poor.push(formattedStudent);
              break;
            default:
              break;
          }
        });

        setStudentData(categorized);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const columns = [
    { title: 'Roll No', dataIndex: 'rollNo', key: 'rollNo' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Completed', dataIndex: 'completed', key: 'completed' },
  ];

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'excellent': return 'Excellent Students (Category A)';
      case 'good': return 'Good Students (Category B)';
      case 'poor': return 'Poor Students (Category C)';
      default: return '';
    }
  };

  return (
    <div className="reports-container">
      <h1>Student Performance Report</h1>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row gutter={[24, 24]} className="stats-row">
            <Col xs={24} sm={8}>
              <Card className="stat-card excellent" onClick={() => handleCardClick('excellent')}>
                <Statistic
                  title="Excellent Students"
                  value={studentData.excellent.length}
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <p className="category-desc">Category A</p>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="stat-card good" onClick={() => handleCardClick('good')}>
                <Statistic
                  title="Good Students"
                  value={studentData.good.length}
                  prefix={<LikeOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <p className="category-desc">Category B</p>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="stat-card poor" onClick={() => handleCardClick('poor')}>
                <Statistic
                  title="Poor Students"
                  value={studentData.poor.length}
                  prefix={<FrownOutlined />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
                <p className="category-desc">Category C</p>
              </Card>
            </Col>
          </Row>

          <Modal
            title={getCategoryTitle(selectedCategory)}
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            width={700}
          >
            <Table
              dataSource={selectedCategory ? studentData[selectedCategory] : []}
              columns={columns}
              rowKey="rollNo"
              pagination={false}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default Reports;
