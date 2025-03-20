

import { Form, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { LoginAdmin } from "../apicalls/login";
import './css/login.css';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginAdmin(values);
   
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/exam");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          QUIZ - LOGIN <i className="ri-login-circle-line"></i>
        </h1>

        <div className="divider"></div>

        <Form layout="vertical" className="login-form" onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>

          <button type="submit" className="login-button">
            Login
          </button>

          <Link to="/register" className="register-link">
            Not a member? Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
