import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import './css/ProfileMenu.css';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="profile-menu-container">
      <div className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
        <UserOutlined />
      </div>
      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <p>{user?.name}</p>
            <small>{user?.email}</small>
          </div>
          <div className="profile-menu-items">
            <button onClick={() => navigate('/student-dashboard')}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;