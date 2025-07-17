import { Form, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import loginIllustration from "../assets/login-illustration.svg";
import Navbar from "./Nav";
import Nav from "./Nav";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function StudentLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${BASE_URL}/api/students/login`,
                {
                    rollNumber: values.rollNumber,
                    password: values.password,
                }
            );

            if (response.data) {
                const studentData = {
                    ...response.data.student,
                    lastLogin: new Date().toISOString(),
                    isLoggedIn: true,
                    role: "student",
                };
                localStorage.setItem(
                    "studentData",
                    JSON.stringify(studentData)
                );
                localStorage.setItem("studentToken", response.data.token);
                message.success("Login successful!");
                navigate("/");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className="login-illustration">
                    <img src={loginIllustration} alt="Login illustration" />
                </div>
                <div className="login-form-container">
                    <div className="login-card">
                        <h1 className="login-title">Student Login</h1>
                        <Form
                            layout="vertical"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item name="rollNumber">
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Roll Number"
                                        onFocus={() =>
                                            setFocusedField("rollNumber")
                                        }
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
                                        onFocus={() =>
                                            setFocusedField("password")
                                        }
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    <LockOutlined className="input-icon" />
                                </div>
                            </Form.Item>

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? <LoadingOutlined /> : "Sign in"}
                            </button>

                            <Link to="/register" className="register-link">
                                Don't have an account?{" "}
                                <span className="register-highlight">
                                    Sign up
                                </span>
                            </Link>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentLogin;
