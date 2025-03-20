import { Form, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../apicalls/login";
import "./css/register.css";  

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      console.log(response);
      if (response.success) {
        message.success(response.message);
        navigate("/admin");
      } else {
        message.error(response.message);
        console.log(response.message);
        
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">
          QUIZ - REGISTER <i className="ri-user-add-line"></i>
        </h1>

        <div className="divider"></div>

        <Form layout="vertical" className="register-form" onFinish={onFinish}>
          <Form.Item name="name" label="Name">
            <input type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>

          <button type="submit" className="register-button">
            Register
          </button>

          <Link to="/admin" className="register-link">
            Already a member? Login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
