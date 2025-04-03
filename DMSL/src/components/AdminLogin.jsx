import { Form, message } from "antd";
import React, { useState } from "react";
import { LoginAdmin } from "../apicalls/login";
import './css/login.css';
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import loginIllustration from '../assets/login-illustration.svg';

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await LoginAdmin(values);
      if (response.success) {
        const userData = {
          ...response.data,
          lastLogin: new Date().toISOString(),
          isLoggedIn: true,
          role: 'admin'
        };
        localStorage.setItem("adminData", JSON.stringify(userData));
        message.success("Admin login successful!");
        navigate('/admin');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
        <div className="login-illustration">
            <img src={loginIllustration} alt="Login illustration" />
        </div>
        <div className="login-form-container">
            <div className="login-card">
                <h1 className="login-title">Admin Login</h1>
                <Form layout="vertical" className="login-form" onFinish={onFinish}>
                    <Form.Item name="email">
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Email address"
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <UserOutlined className="input-icon" />
                        </div>
                    </Form.Item>
                    <Form.Item name="password">
                        <div className="input-wrapper">
                            <input 
                                type="password" 
                                placeholder="Password"
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <LockOutlined className="input-icon" />
                        </div>
                    </Form.Item>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? <LoadingOutlined /> : 'Sign in'}
                    </button>
                </Form>
            </div>
        </div>
    </div>
  );
}

export default AdminLogin;