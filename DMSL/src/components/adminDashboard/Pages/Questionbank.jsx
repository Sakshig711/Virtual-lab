
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../apicalls/axios"; // Adjust the import path as necessary
import {Card, Row,Col,Statistic,Tabs,Form,Input,Button,Select,InputNumber,Space,List,Table} from "antd";
import { Column } from "@ant-design/charts";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Quizzes.css";

const { TabPane } = Tabs;

const QBank= () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newQuestion, setNewQuestion] = useState({ question: "", options: ["", "", "", ""], correctOption: "" });

  useEffect(() => {
    axiosInstance.get("/api/get-all-quiz")
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  const handleAssignmentClick = (assignmentId) => {
    setSelectedAssignment(selectedAssignment === assignmentId ? null : assignmentId);
  };

  const handleEditClick = (question) => {
    setEditingQuestion(question._id);
    setEditedData({
      question: question.question,
      options: [...question.options],
      correctOption: question.correctOption,
    });
  };

  const handleSave = async (questionId) => {
    try {
      const response = await axiosInstance.put(`/api/update-question/${questionId}`, editedData);
      if (response.data.success) {
        alert("Question updated successfully!");
        setEditingQuestion(null);
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment.questions.some((q) => q._id === questionId)
              ? {
                  ...assignment,
                  questions: assignment.questions.map((q) =>
                    q._id === questionId ? { ...q, ...editedData } : q
                  ),
                }
              : assignment
          )
        );
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleAddQuestion = async () => {
    if (!selectedAssignment) {
      alert("Please select an assignment first.");
      return;
    }

    const payload = {
      assignmentId: selectedAssignment,
      question: newQuestion.question,
      options: newQuestion.options,
      correctOption: newQuestion.correctOption,
    };

    try {
      const response = await axiosInstance.post("/api/add-question-to-exam", payload);
      if (response.data.success) {
        alert("Question added successfully!");
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment._id === selectedAssignment
              ? {
                  ...assignment,
                  questions: [...assignment.questions, { _id: response.data.questionId, ...newQuestion }],
                }
              : assignment
          )
        );
        setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: "" });
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="container">
      <h1>Assignments</h1>
      <Row gutter={[16, 16]}>
        {assignments.map((assignment) => (
          <Col span={8} key={assignment._id}>
            <Card
              title={assignment.title}
              onClick={() => handleAssignmentClick(assignment._id)}
              hoverable
            >
              <Statistic title="Total Questions" value={assignment.questions.length} />
            </Card>
          </Col>
        ))}
      </Row>
      {selectedAssignment && (
        <div>
          <h2>Questions for {assignments.find((a) => a._id === selectedAssignment)?.title}</h2>
          <Table
            dataSource={assignments.find((a) => a._id === selectedAssignment)?.questions || []}
            columns={[
              {
                title: "Question",
                dataIndex: "question",
                key: "question",
                render: (text, record) =>
                  editingQuestion === record._id ? (
                    <Input
                      value={editedData.question}
                      onChange={(e) => setEditedData({ ...editedData, question: e.target.value })}
                    />
                  ) : (
                    text
                  ),
              },
              {
                title: "Options",
                dataIndex: "options",
                key: "options",
                render: (opts, record) =>
                  editingQuestion === record._id ? (
                    opts.map((opt, i) => (
                      <Input
                        key={i}
                        value={editedData.options[i]}
                        onChange={(e) => {
                          const newOptions = [...editedData.options];
                          newOptions[i] = e.target.value;
                          setEditedData({ ...editedData, options: newOptions });
                        }}
                      />
                    ))
                  ) : (
                    opts.join(", ")
                  ),
              },
              {
                title: "Correct",
                dataIndex: "correctOption",
                key: "correctOption",
                render: (text, record) =>
                  editingQuestion === record._id ? (
                    <Input
                      value={editedData.correctOption}
                      onChange={(e) => setEditedData({ ...editedData, correctOption: e.target.value })}
                    />
                  ) : (
                    text
                  ),
              },
              {
                title: "Actions",
                key: "actions",
                render: (_, record) =>
                  editingQuestion === record._id ? (
                    <Space>
                      <Button type="primary" onClick={() => handleSave(record._id)}>Save</Button>
                      <Button onClick={() => setEditingQuestion(null)}>Cancel</Button>
                    </Space>
                  ) : (
                    <Space>
                      <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)}>Edit</Button>
                      <Button icon={<DeleteOutlined />} danger>Delete</Button>
                    </Space>
                  ),
              },
              
            ]}
          />

          <Card className="section-card">
            <h3>Add New Question</h3>
            <Form layout="vertical" onFinish={handleAddQuestion}>
              <Form.Item label="Question" required>
                <Input value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />
              </Form.Item>
              {newQuestion.options.map((opt, i) => (
                <Form.Item key={i} label={`Option ${i + 1}`} required>
                  <Input
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[i] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: newOptions });
                    }}
                  />
                </Form.Item>
              ))}
              <Form.Item label="Correct Answer" required>
                <Input value={newQuestion.correctOption} onChange={(e) => setNewQuestion({ ...newQuestion, correctOption: e.target.value })} />
              </Form.Item>
              <Button type="primary" htmlType="submit">Add Question</Button>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QBank;
