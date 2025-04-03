
import { Form, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginAdmin } from "../apicalls/login";
import './css/login.css';
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

// Update the import path to match your file structure
import loginIllustration from '../assets/login-illustration.svg';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // First validate email format
      if (!values.email.endsWith('@gmail.com')) {
        message.error('Please use valid email address');
        return;
      }

      // Demo user credentials check
      if (values.email === "shlok@gmail.com" && values.password === "shlok") {
        const demoUser = {
          name: "shlok gaidhani",
          rollNo: "TECOA123",
          class: "TE",
          batch: "L3",
          email: "shlok@gmail.com",
          role: "student",
          lastLogin: new Date().toISOString(),
          isLoggedIn: true  // Add this flag
        };
        localStorage.setItem("user", JSON.stringify(demoUser));
        message.success("Login successful!");
        window.location.href = '/';  // Changed to href for complete page reload
        return;
      }

      // Regular login logic
      const response = await LoginAdmin(values);
      if (response.success) {
        const userData = {
          ...response.data,
          lastLogin: new Date().toISOString(),
          isLoggedIn: true  // Add this flag
        };
        localStorage.setItem("user", JSON.stringify(userData));
        message.success("Login successful!");
        window.location.href = '/';  // Changed to href for complete page reload
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
                <h1 className="login-title">Sign in</h1>
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

                    <Link to="/register" className="register-link">
                        Don't have an account? <span className="register-highlight">Sign up</span>
                    </Link>
                </Form>
            </div>
        </div>
    </div>
);
}

export default Login;
