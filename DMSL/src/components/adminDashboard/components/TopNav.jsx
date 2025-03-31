import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { Modal, List, Tag } from 'antd';
import './TopNav.css';

const TopNav = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weakStudents] = useState([
    { id: 1, name: 'John Smith', rollNo: '101', marks: 45, subject: 'Database Basics' },
    { id: 2, name: 'Emily Brown', rollNo: '105', marks: 35, subject: 'SQL Queries' },
    { id: 3, name: 'Mike Wilson', rollNo: '108', marks: 42, subject: 'DBMS Architecture' },
  ]);

  const handleNotificationClick = () => {
    setIsModalVisible(true);
  };

  return (
    <nav className="top-nav">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="search" placeholder="Search students or quizzes..." />
      </div>
      <div className="nav-right">
        <div className="notification" onClick={handleNotificationClick}>
          <FaBell className="bell-icon" />
          <span className="notification-badge">{weakStudents.length}</span>
        </div>
        <div className="nav-profile">
          <div className="profile-info">
            <span className="admin-name">Admin Name</span>
            <span className="admin-role">Administrator</span>
          </div>
          <FaUserCircle className="profile-icon" />
        </div>
      </div>

      <Modal
        title="Low Performance Alerts"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={weakStudents}
          renderItem={student => (
            <List.Item>
              <List.Item.Meta
                title={`${student.name} (Roll No: ${student.rollNo})`}
                description={`Subject: ${student.subject}`}
              />
              <Tag color="red">{student.marks}%</Tag>
            </List.Item>
          )}
        />
      </Modal>
    </nav>
  );
};

export default TopNav;