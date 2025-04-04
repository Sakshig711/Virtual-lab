
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../apicalls/axios";
import { Card, Form, Input, InputNumber, Select, Button } from "antd";

const Schedule = () => {
  const [assignments, setAssignments] = useState([]); // Store assignments
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Selected assignment ID
  const [questions, setQuestions] = useState([]); // All assignments with questions
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Questions for selected assignment
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Questions user selects
  const [examTitle, setExamTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  // Fetch Assignments
  useEffect(() => {
    axiosInstance
      .get("/api/exams/get-questions")
      .then((response) => {

        const sortedAssignments = response.data
        .map(({ assignmentId, title }) => ({ assignmentId, title }))
        .sort((a, b) => a.assignmentId - b.assignmentId); 
        setQuestions(response.data); // Save all assignment data
        setAssignments(sortedAssignments); // Extract assignment list
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  // Filter Questions when Assignment is Selected
  useEffect(() => {
    if (selectedAssignment) {
      const selectedAssignmentData = questions.find(a => a.assignmentId === selectedAssignment);
      setFilteredQuestions(selectedAssignmentData ? selectedAssignmentData.questions : []);
      setSelectedQuestions([]); // Reset selected questions when changing assignments
    }
  }, [selectedAssignment, questions]);

  const handleScheduleExam = async () => {
    if (!examTitle || !selectedQuestions.length || !duration || !totalMarks || !scheduledTime) {
      alert("Please fill in all fields!");
      return;
    }

    const payload = {
      title: examTitle,
      selectedQuestions,
      duration: parseInt(duration),
      totalMarks: parseInt(totalMarks),
      scheduledTime,
      createdBy: "67ebebba7a9fbb4dc715e550",
    };

    try {
      const response = await axiosInstance.post("/api/exams/schedule-exam", payload);
      if (response.data.success) {
        alert("Exam scheduled successfully!");
        setExamTitle("");
        setSelectedAssignment(null);
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

        <Form.Item name="assignment" label="Select Assignment" rules={[{ required: true }]}>
          <Select
            value={selectedAssignment}
            onChange={(value) => setSelectedAssignment(value)}
            placeholder="Select Assignment"
          >
            {assignments.map(({ assignmentId, title }) => (
              <Select.Option key={assignmentId} value={assignmentId}>
                {title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="selectedQuestions" label="Select Questions" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            value={selectedQuestions}
            onChange={setSelectedQuestions}
            placeholder={filteredQuestions.length ? "Select Questions" : "No questions available"}
            disabled={!filteredQuestions.length}
          >
            {filteredQuestions.map((q) => (
              <Select.Option key={q._id} value={q._id}>
                {q.question}
              </Select.Option>
            ))}
          </Select>
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
