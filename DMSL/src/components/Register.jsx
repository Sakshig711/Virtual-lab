import { Form, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Add axios import
import './css/register.css';
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, UserOutlined, LockOutlined, MailOutlined, IdcardOutlined, BookOutlined } from '@ant-design/icons';
import loginIllustration from '../assets/login-illustration.svg';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (!validatePassword(values.password)) {
        message.error('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
        return;
      }

      // Modify the data structure to match the student registration endpoint
      const studentData = {
        name: values.name,
        email: values.email,
        rollNumber: values.rollNo,
        class: values.class,
        batch: values.batch,
        password: values.password
      };

      const response = await axios.post('http://localhost:3000/api/students/register', studentData);

      if (response.data) {
        message.success("Registration successful!");
        navigate('/login'); // Navigate to student login
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-illustration">
        <img src={loginIllustration} alt="Register illustration" />
      </div>
      <div className="register-form-container">
        <div className="register-card">
          <h1 className="register-title">Create Account</h1>
          <Form layout="vertical" className="register-form" onFinish={onFinish}>
            <Form.Item 
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <UserOutlined className="input-icon" />
              </div>
            </Form.Item>

            <Form.Item 
              name="rollNo"
              rules={[{ required: true, message: 'Please enter your roll number' }]}
            >
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Roll Number"
                  onFocus={() => setFocusedField('rollNo')}
                  onBlur={() => setFocusedField(null)}
                />
                <IdcardOutlined className="input-icon" />
              </div>
            </Form.Item>

            <div className="form-row">
                <Form.Item 
                    name="class"
                    rules={[{ required: true, message: 'Please select your class' }]}
                >
                    <div className="input-wrapper">
                        <select 
                            onFocus={() => setFocusedField('class')}
                            onBlur={() => setFocusedField(null)}
                            className="select-input"
                        >
                            <option value="">Select Class</option>
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                        </select>
                        <BookOutlined className="input-icon" />
                    </div>
                </Form.Item>

                <Form.Item 
                    name="batch"
                    rules={[{ required: true, message: 'Please select your batch' }]}
                >
                    <div className="input-wrapper">
                        <select 
                            onFocus={() => setFocusedField('batch')}
                            onBlur={() => setFocusedField(null)}
                            className="select-input"
                        >
                            <option value="">Select Batch</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="L4">L4</option>
                        </select>
                        <BookOutlined className="input-icon" />
                    </div>
                </Form.Item>
            </div>

            <Form.Item 
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="PICT Email Address"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <MailOutlined className="input-icon" />
              </div>
            </Form.Item>

            <Form.Item 
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
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

            <div className="password-requirements">
              <p>Password must contain:</p>
              <ul>
                <li>At least 8 characters</li>
                <li>Uppercase & lowercase letters</li>
                <li>Numbers</li>
              </ul>
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? <LoadingOutlined /> : 'Create Account'}
            </button>

            <Link to="/login" className="login-link">
              Already have an account? <span className="login-highlight">Sign in</span>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
