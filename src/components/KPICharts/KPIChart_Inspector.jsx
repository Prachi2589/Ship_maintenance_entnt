import React, { useState, useEffect, useRef } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import html2canvas from 'html2canvas';
import './KPIChart_Inspector.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const KPIChart_Inspector = () => {
  const [inspections, setInspections] = useState([]);
  const [timeRange, setTimeRange] = useState('monthly');
  const dashboardRef = useRef(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('inspections'));
    if (localData && Array.isArray(localData)) {
      setInspections(localData);
    } else {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
      const formatDate = (day) =>
        `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const dummyInspections = [
        { date: formatDate(1), status: 'Passed' },
        { date: formatDate(3), status: 'Failed' },
        { date: formatDate(7), status: 'Passed' },
        { date: formatDate(10), status: 'Failed' },
        { date: formatDate(12), status: 'Pending' },
        { date: formatDate(20), status: 'Passed' },
        { date: formatDate(22), status: 'Failed' },
      ];
      setInspections(dummyInspections);
    }
  }, []);

  const filtered = inspections.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    if (timeRange === 'monthly') {
      return now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear();
    } else if (timeRange === 'weekly') {
      const diffDays = (now - date) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    } else if (timeRange === 'yearly') {
      return now.getFullYear() === date.getFullYear();
    }
    return false;
  });

  const statusCount = {
    Passed: 0,
    Failed: 0,
    Pending: 0,
  };

  filtered.forEach((inspection) => {
    statusCount[inspection.status] += 1;
  });

  const barChartData = {
    labels: ['Passed', 'Failed', 'Pending'],
    datasets: [
      {
        label: 'Inspection Results',
        data: [statusCount.Passed, statusCount.Failed, statusCount.Pending],
        backgroundColor: ['#4ade80', '#f87171', '#fbbf24'],
        borderRadius: 6,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Passed', 'Failed', 'Pending'],
    datasets: [
      {
        label: 'Inspections',
        data: [statusCount.Passed, statusCount.Failed, statusCount.Pending],
        backgroundColor: ['#34d399', '#ef4444', '#facc15'],
        borderWidth: 1,
      },
    ],
  };

  // Handler to download dashboard as image
  const downloadDashboardAsImage = async () => {
    if (!dashboardRef.current) return;

    try {
      const canvas = await html2canvas(dashboardRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'inspector_dashboard.png';
      link.click();
    } catch (error) {
      console.error('Error capturing dashboard image:', error);
    }
  };

  return (
    <>
      <div className="inspector-kpi-container" ref={dashboardRef}>
        <h2>Inspector KPI Dashboard</h2>

        <div className="inspector-controls">
          <label htmlFor="timeRange">Time Range:</label>
          <select id="timeRange" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="inspector-charts">
          <div className="inspector-chart-card">
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
          <div className="inspector-chart-card">
            <Doughnut data={doughnutChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="inspector-stats">
          <p><strong>Total Inspections:</strong> {filtered.length}</p>
          <p><strong>Passed:</strong> {statusCount.Passed}</p>
          <p><strong>Failed:</strong> {statusCount.Failed}</p>
          <p><strong>Pending:</strong> {statusCount.Pending}</p>
        </div>
      </div>

      <button className="download-btn" onClick={downloadDashboardAsImage}>
        Download Dashboard as Image
      </button>
    </>
  );
};

export default KPIChart_Inspector;
