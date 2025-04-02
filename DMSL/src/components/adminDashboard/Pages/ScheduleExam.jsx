import React, { useState, useEffect } from "react";
import axiosInstance from "../../../apicalls/axios";
import { Card, Form, Input, InputNumber, Select, Button } from "antd";

const Schedule = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/api/exams/get-questions")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleScheduleExam = async () => {
    if (!examTitle || !selectedQuestions.length || !duration || !totalMarks || !scheduledTime) {
      alert("Please fill in all fields!");
      return;
    }
    const utcScheduledTime = new Date(scheduledTime).toISOString();
    const payload = {
      title: examTitle,
      selectedQuestions,
      duration: parseInt(duration),
      totalMarks: parseInt(totalMarks),
      scheduledTime: utcScheduledTime,
      createdBy: "67ebebba7a9fbb4dc715e550", 
    };
    try {
      console.log("Scheduling...");
      const response = await axiosInstance.post("/api/exams/schedule-exam", payload);
      if (response.data.success) {
        alert("Exam scheduled successfully!");
        setExamTitle("");
        setSelectedQuestions([]);
        setDuration("");
        setTotalMarks("");
        setScheduledTime("");
      }
    } catch (error) {
      console.error("Error scheduling exam:", error);
    }
  };

  return (
    <Card className="section-card">
      <h3 className="section-title">Schedule an Exam</h3>
      <Form layout="vertical" onFinish={handleScheduleExam}>
        <Form.Item name="title" label="Exam Title" rules={[{ required: true }]}> 
          <Input value={examTitle} onChange={(e) => setExamTitle(e.target.value)} />
        </Form.Item>
        <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true }]}> 
          <InputNumber min={15} value={duration} onChange={(value) => setDuration(value)} />
        </Form.Item>
        <Form.Item name="totalMarks" label="Total Marks" rules={[{ required: true }]}> 
          <InputNumber min={1} value={totalMarks} onChange={(value) => setTotalMarks(value)} />
        </Form.Item>
        <Form.Item name="scheduledTime" label="Scheduled Time" rules={[{ required: true }]}> 
          <Input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
        </Form.Item>
        <Form.Item name="selectedQuestions" label="Select Questions" rules={[{ required: true }]}> 
          <Select mode="multiple" value={selectedQuestions} onChange={setSelectedQuestions}> 
            {questions.map((q) => (
              <Select.Option key={q._id} value={q._id}> 
                {q.question}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"> 
            Schedule Exam
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Schedule;
