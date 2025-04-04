import React, { useState, useEffect } from "react";
import axiosInstance from "../../../apicalls/axios";
import { Card, Table, Button, Modal, Form, Input, InputNumber, Select, Tag, Space } from "antd";
import "./ManageScheduledExams.css";

const ManageScheduledExams = () => {
  const [exams, setExams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axiosInstance.get("/api/exams/active-exams");
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleEdit = (exam) => {
    setSelectedExam(exam);
    form.setFieldsValue({
      title: exam.title,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      scheduledTime: new Date(exam.scheduledTime).toISOString().slice(0, 16),
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (examId) => {
    try {
      const response = await axiosInstance.delete(`/api/exams/delete-exam/${examId}`);
      if (response.data.success) {
        fetchExams();
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axiosInstance.put(`/api/exams/modify-exam/${selectedExam._id}`, {
        ...values,
        selectedQuestions: selectedExam.selectedQuestions.map(q => q._id),
        createdBy: selectedExam.createdBy
      });
      if (response.data.success) {
        setIsModalVisible(false);
        fetchExams();
      }
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  const columns = [
    {
      title: "Exam Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="exam-title">{text}</span>,
    },
    {
      title: "Duration (minutes)",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => <Tag color="blue">{duration} mins</Tag>,
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      key: "totalMarks",
      render: (marks) => <Tag color="green">{marks} marks</Tag>,
    },
    {
      title: "Questions",
      dataIndex: "selectedQuestions",
      key: "questions",
      render: (questions) => <Tag color="purple">{questions.length} questions</Tag>,
    },
    {
      title: "Scheduled Time",
      dataIndex: "scheduledTime",
      key: "scheduledTime",
      render: (text) => (
        <span className="scheduled-time">
          {new Date(text).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            onClick={() => handleEdit(record)}
            className="edit-button"
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            onClick={() => handleDelete(record._id)}
            className="delete-button"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card className="section-card">
      <h3 className="section-title">Manage Scheduled Exams</h3>
      <Table 
        dataSource={exams} 
        columns={columns} 
        rowKey="_id"
        className="exams-table"
      />

      <Modal
        title="Edit Exam"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="edit-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="title"
            label="Exam Title"
            rules={[{ required: true, message: "Please enter exam title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration (minutes)"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <InputNumber min={15} />
          </Form.Item>

          <Form.Item
            name="totalMarks"
            label="Total Marks"
            rules={[{ required: true, message: "Please enter total marks" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="scheduledTime"
            label="Scheduled Time"
            rules={[{ required: true, message: "Please select scheduled time" }]}
          >
            <Input type="datetime-local" />
          </Form.Item>

          {selectedExam && (
            <div className="questions-list">
              <h4>Selected Questions:</h4>
              {selectedExam.selectedQuestions.map((q, index) => (
                <div key={q._id} className="question-item">
                  {index + 1}. {q.question}
                </div>
              ))}
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="update-button">
              Update Exam
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ManageScheduledExams;