import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Card, List } from 'antd';
import './Students.css';
import axiosInstance from '../../../apicalls/axios';

function Students() {
  const [students] = useState([
    {
      key: '1',
      name: 'John Doe',
      rollNo: '101',
      totalAssignments: 5,
      marks: 85,
      category: 'Excellent',
      batchRank: 3,
      classRank: 5,
      percentile: 95.5,
      assignments: [
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5
        },
        { 
          name: 'Database Basics', 
          marks: 90, 
          date: '2024-01-10', 
          status: 'completed',
          batchAvg: 82,
          classAvg: 78,
          percentile: 96.5,
        },
      ],
    },
  ]);
}

export default Students;
