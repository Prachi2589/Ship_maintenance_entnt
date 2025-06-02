import React, { useState, useEffect, useRef } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import './KPICharts.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const KPICharts = ({ jobs, ships, components }) => {
  const [kpiData, setKpiData] = useState({
    totalShips: 0,
    jobsOpen: 0,
    jobsScheduled: 0,
    overdueComponents: 0,
    jobsCompleted: 0,
    componentsFixed: 0,
  });

  const [timeRange, setTimeRange] = useState('monthly');
  const [targetData] = useState({
    totalShips: 2,
    jobsOpen: 1,
    jobsScheduled: 1,
    overdueComponents: 1,
    jobsCompleted: 1,
    componentsFixed: 1,
  });

  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  useEffect(() => {
    const totalShips = ships.length;
    const jobsOpen = jobs.filter((job) => job.status === 'Open').length;
    const jobsScheduled = jobs.filter((job) => job.status === 'Scheduled').length;
    const jobsCompleted = jobs.filter((job) => job.status === 'Completed').length;

    const currentDate = new Date();
    const overdueComponents = components.filter((component) => {
      const lastMaintenanceDate = new Date(component.lastMaintenanceDate);
      const timeDiff = currentDate - lastMaintenanceDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff > 30;
    }).length;

    const filteredComponents = components.filter((component) => {
      const lastMaintenanceDate = new Date(component.lastMaintenanceDate);
      if (timeRange === 'monthly') {
        return currentDate.getMonth() - lastMaintenanceDate.getMonth() <= 1;
      } else if (timeRange === 'weekly') {
        const diffTime = Math.abs(currentDate - lastMaintenanceDate);
        const diffDays = diffTime / (1000 * 3600 * 24);
        return diffDays <= 7;
      } else if (timeRange === 'yearly') {
        return currentDate.getFullYear() === lastMaintenanceDate.getFullYear();
      }
      return false;
    });

    const componentsFixed = filteredComponents.length;

    setKpiData({
      totalShips,
      jobsOpen,
      jobsScheduled,
      overdueComponents,
      jobsCompleted,
      componentsFixed,
    });
  }, [jobs, ships, components, timeRange]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const downloadChartAsImage = (chartRef, filename) => {
    const chart = chartRef.current;
    if (chart && chart.toBase64Image) {
      const url = chart.toBase64Image();
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
  };

  const lineChartData = {
    labels: ['Ships', 'Jobs Open', 'Jobs Scheduled', 'Jobs Completed', 'Overdue Components', 'Components Fixed'],
    datasets: [
      {
        label: 'KPI Overview',
        data: [
          kpiData.totalShips,
          kpiData.jobsOpen,
          kpiData.jobsScheduled,
          kpiData.jobsCompleted,
          kpiData.overdueComponents,
          kpiData.componentsFixed
        ],
        borderColor: '#2563eb',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Target Overview',
        data: [
          targetData.totalShips,
          targetData.jobsOpen,
          targetData.jobsScheduled,
          targetData.jobsCompleted,
          targetData.overdueComponents,
          targetData.componentsFixed
        ],
        borderColor: '#34D399',
        borderDash: [5, 5],
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Jobs Open', 'Jobs Scheduled', 'Jobs Completed'],
    datasets: [
      {
        label: 'Job Status Distribution',
        data: [kpiData.jobsOpen, kpiData.jobsScheduled, kpiData.jobsCompleted],
        backgroundColor: ['#facc15', '#60a5fa', '#4ade80'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Count: ${context.raw}`;
          },
        },
      },
    },
  };

  const healthIndex = (
    (kpiData.jobsOpen + kpiData.jobsScheduled + kpiData.jobsCompleted + kpiData.overdueComponents + kpiData.componentsFixed) / 5
  ).toFixed(2);

  return (
    <div className="kpi-container">
      <h2>KPI Dashboard</h2>

      <div className="time-selector">
        <label htmlFor="timeRange">Time Range:</label>
        <select id="timeRange" value={timeRange} onChange={handleTimeRangeChange}>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="charts-wrapper">
        <div className="chart-card">
          <Line ref={lineChartRef} data={lineChartData} options={chartOptions} />
          <button
            onClick={() => downloadChartAsImage(lineChartRef, 'line_chart.png')}
            className="mt-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export
          </button>
        </div>

        <div className="chart-card">
          <Doughnut ref={doughnutChartRef} data={doughnutChartData} options={chartOptions} />
          <button
            onClick={() => downloadChartAsImage(doughnutChartRef, 'doughnut_chart.png')}
            className="mt-2 p-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Export
          </button>
        </div>
      </div>

      <div className="health-index">
        <h3>System Health Index: {healthIndex}</h3>
      </div>
    </div>
  );
};

export default KPICharts;
