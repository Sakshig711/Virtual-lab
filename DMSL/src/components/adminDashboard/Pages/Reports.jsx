import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Modal, Table } from 'antd';
import { TrophyOutlined, LikeOutlined, FrownOutlined } from '@ant-design/icons';
import './Reports.css';

function Reports() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studentData] = useState({
    excellent: [
      { id: 1, name: 'John Doe', rollNo: '101', marks: 85 },
      { id: 2, name: 'Jane Smith', rollNo: '102', marks: 92 },
    ],
    good: [
      { id: 3, name: 'Mike Johnson', rollNo: '103', marks: 75 },
      { id: 4, name: 'Sarah Williams', rollNo: '104', marks: 68 },
    ],
    poor: [
      { id: 5, name: 'Tom Brown', rollNo: '105', marks: 45 },
      { id: 6, name: 'Emily Davis', rollNo: '106', marks: 55 },
    ],
  });

  const columns = [
    { title: 'Roll No', dataIndex: 'rollNo', key: 'rollNo' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Marks', dataIndex: 'marks', key: 'marks' },
  ];

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const getCategoryTitle = (category) => {
    switch(category) {
      case 'excellent': return 'Excellent Students (Above 80%)';
      case 'good': return 'Good Students (60-80%)';
      case 'poor': return 'Poor Students (Below 60%)';
      default: return '';
    }
  };

  return (
    <div className="reports-container">
      <h1>Student Performance Report</h1>
      <Row gutter={[24, 24]} className="stats-row">
        <Col xs={24} sm={8}>
          <Card className="stat-card excellent" onClick={() => handleCardClick('excellent')}>
            <Statistic
              title="Excellent Students"
              value={studentData.excellent.length}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <p className="category-desc">Marks above 80%</p>
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
            <p className="category-desc">Marks between 60-80%</p>
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
            <p className="category-desc">Marks below 60%</p>
          </Card>
        </Col>
      </Row>

      <Modal
        title={getCategoryTitle(selectedCategory)}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Table
          dataSource={selectedCategory ? studentData[selectedCategory] : []}
          columns={columns}
          pagination={false}
        />
      </Modal>
    </div>
  );
}

export default Reports;