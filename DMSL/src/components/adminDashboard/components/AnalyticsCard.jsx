import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './AnalyticsCard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsCard = ({ title, stats, chartData, isPieChart }) => {
  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Students per Assignment'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Students: ${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students'
        },
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed} students`
        }
      }
    }
  };

  return (
    <div className="analytics-card">
      <div className="card-header">
        <h3>{title}</h3>
        <div className="stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span>{stat.label}</span>
              <h4>{stat.value}</h4>
            </div>
          ))}
        </div>
      </div>
      {chartData && (
        <div className={`chart-section ${isPieChart ? 'pie-chart' : ''}`}>
          {isPieChart ? (
            <Pie data={chartData} options={pieOptions} />
          ) : (
            <Bar data={chartData} options={barOptions} />
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;