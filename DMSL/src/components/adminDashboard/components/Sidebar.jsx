import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Students', path: '/admin/students' },
    { label: 'Quizzes', path: '/admin/quizzes' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Logout', path: '/logout' }
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>DMSL Admin</h2>
      </div>
      <nav className="nav-sidebar">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;