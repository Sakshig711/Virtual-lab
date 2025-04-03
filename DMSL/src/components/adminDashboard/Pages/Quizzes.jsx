
import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Tabs, Form, Input, Button, Select, InputNumber, Space, List } from 'antd';
import { Column } from '@ant-design/charts';
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Quizzes.css';
import QBank from './Questionbank';
import Schedule from './ScheduleExam';
import {  useEffect } from 'react';
import axiosInstance from '../../../apicalls/axios';
function Quizzes() {
  // const [quizzes] = useState([
  //   {
  //     id: 1,
  //     title: 'Assignment 1: Database Basics',
  //     totalStudents: 50,
  //     appearedStudents: 45,
  //     averageMarks: 75,
  //     marksDistribution: [
  //       { category: '0-30', count: 5 },
  //       { category: '31-60', count: 15 },
  //       { category: '61-80', count: 15 },
  //       { category: '81-100', count: 10 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Assignment 2: SQL Queries',
  //     totalStudents: 50,
  //     appearedStudents: 48,
  //     averageMarks: 82,
  //     marksDistribution: [
  //       { category: '0-30', count: 3 },
  //       { category: '31-60', count: 12 },
  //       { category: '61-80', count: 18 },
  //       { category: '81-100', count: 15 },
  //     ],
  //   },
  // ]);
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get('/api/class-statistics');
        const apiData = response.data;
  
        const transformedQuizzes = Object.entries(apiData.assignmentStats).map(
          ([assignmentId, stats]) => ({
            id: parseInt(assignmentId),
            title: `Assignment ${assignmentId}`,
            totalStudents: apiData.totalStudents,
            appearedStudents: stats.studentCount,
            averageMarks: parseFloat(stats.average),
            marksDistribution: Object.entries(apiData.categoryDistribution).map(
              ([category, count]) => ({
                category,
                count
              })
            ),
          })
        );
  
        setQuizzes(transformedQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
  
    fetchQuizzes();
  }, []);
  
  const getChartConfig = (title) => ({
    height: 200,
    xField: 'category',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    title: {
      text: `${title} - Marks Distribution`,
      style: {
        fontSize: 14,
        fontWeight: 500,
      },
    },
    meta: {
      category: { alias: 'Marks Range' },
      count: { alias: 'Number of Students' }
    },
    tooltip: {
      formatter: (datum) => {
        return { name: 'Students', value: datum.count };
      }
    }
  });

  const totalAppearedStudents = quizzes.reduce((total, quiz) => total + quiz.appearedStudents, 0);

  const [questions, setQuestions] = useState([
    { id: 1, question: 'What is a database?', marks: 5, type: 'theory' },
    { id: 2, question: 'Explain SQL joins', marks: 10, type: 'theory' },
  ]);

  const { TabPane } = Tabs;

  const onQuestionSubmit = (values) => {
    setQuestions([...questions, { id: questions.length + 1, ...values }]);
  };

  const onExamSubmit = (values) => {
    console.log('Exam created:', values);
  };

  const renderQuestionForm = () => (
    <Card className="section-card">
      <h3 className="section-title">Modify Questions</h3>
      <Form layout="vertical" onFinish={onQuestionSubmit}>
        <Form.Item name="question" label="Question" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="type" label="Question Type" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="mcq">Multiple Choice</Select.Option>
            <Select.Option value="theory">Theory</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="marks" label="Marks" rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Question
          </Button>
        </Form.Item>
      </Form>

      <List
        className="question-list"
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={item => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} type="link" />,
              <Button icon={<DeleteOutlined />} type="link" danger />
            ]}
          >
            <List.Item.Meta
              title={item.question}
              description={`Type: ${item.type}, Marks: ${item.marks}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );

  const renderExamForm = () => (
    <Card className="section-card">
      <h3 className="section-title">Create Exam</h3>
      <Form layout="vertical" onFinish={onExamSubmit}>
        <Form.Item name="title" label="Exam Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true }]}>
          <InputNumber min={15} />
        </Form.Item>
        <Form.Item name="selectedQuestions" label="Select Questions" rules={[{ required: true }]}>
          <Select mode="multiple">
            {questions.map(q => (
              <Select.Option key={q.id} value={q.id}>
                {q.question} ({q.marks} marks)
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Exam
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <div className="quizzes-container">
      <h2>Quiz Performance Dashboard</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Performance" key="1">
          <Card className="total-stats-card">
            <Statistic
              title="Total Students Appeared"
              value={totalAppearedStudents}
              prefix={<UserOutlined />}
            />
          </Card>
          <Row gutter={[16, 16]}>
            {quizzes.map((quiz) => (
              <Col xs={24} sm={12} lg={8} key={quiz.id}>
                <Card title={quiz.title} className="quiz-card">
                  <div className="quiz-stats">
                    <p>Total Students: {quiz.totalStudents}</p>
                    <p>Students Appeared: {quiz.appearedStudents}</p>
                    <p>Average Marks: {quiz.averageMarks}%</p>
                  </div>
                  <div className="chart-container">
                    <Column {...getChartConfig(quiz.title)} data={quiz.marksDistribution} />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Question Bank" key="2">
          {<QBank></QBank>}
        </TabPane>
        <TabPane tab="Create Exam" key="3">
          {<Schedule></Schedule>}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Quizzes;
