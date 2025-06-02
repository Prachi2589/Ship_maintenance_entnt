import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import html2canvas from 'html2canvas';
import './PersonalKPICharts.css';

const PersonalKPICharts = ({ jobs }) => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: '' });

  // KPI calculations
  const completed = jobs.filter(j => j.status === 'Completed').length;
  const pending = jobs.filter(j => j.status !== 'Completed').length;
  const upcoming = jobs.filter(j => new Date(j.scheduledDate) > new Date()).length;

  // Dummy defects data
  const defectsFound = 25;
  const defectsCorrected = 18;
  const defectsPending = defectsFound - defectsCorrected;

  // Memoized data
  const pieData = useMemo(() => [completed, pending, upcoming], [completed, pending, upcoming]);
  const pieLabels = useMemo(() => ['Completed', 'Pending', 'Upcoming'], []);

  const barData = useMemo(() => [defectsFound, defectsCorrected, defectsPending], [defectsFound, defectsCorrected, defectsPending]);
  const barLabels = useMemo(() => ['Found', 'Corrected', 'Pending'], []);

  const lineData = useMemo(() => [5, 8, 12, 18, 20, 22, 25], []);
  const lineLabels = useMemo(() => ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], []);

  const pieCanvasRef = useRef(null);
  const barCanvasRef = useRef(null);
  const lineCanvasRef = useRef(null);

  // Container ref for html2canvas
  const dashboardRef = useRef(null);

  // Drawing functions (same as before)
  const drawPieChart = (ctx, data, labels) => {
    const colors = ['#2ecc71', '#e74c3c', '#f39c12'];
    let startAngle = 0;
    const total = data.reduce((acc, val) => acc + val, 0);
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.arc(200, 200, 100, startAngle, startAngle + sliceAngle);
      ctx.fillStyle = colors[index];
      ctx.fill();
      startAngle += sliceAngle;
    });

    startAngle = 0;
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      const labelX = 200 + 50 * Math.cos(startAngle + sliceAngle / 2);
      const labelY = 200 + 50 * Math.sin(startAngle + sliceAngle / 2);
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(labels[index], labelX, labelY);
      startAngle += sliceAngle;
    });
  };

  const drawBarChart = (ctx, data, labels) => {
    const barWidth = 40;
    const barSpacing = 40;
    const maxHeight = 300;
    const maxData = Math.max(...data);

    data.forEach((value, index) => {
      const x = (barWidth + barSpacing) * index + 50;
      const y = 350 - (value / maxData) * maxHeight;
      const height = (value / maxData) * maxHeight;
      ctx.fillStyle = '#2980b9';
      ctx.fillRect(x, y, barWidth, height);
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.fillText(labels[index], x + barWidth / 2 - 15, 370);
    });
  };

  const drawLineChart = (ctx, data, labels) => {
    const maxValue = Math.max(...data);
    const maxHeight = 300;

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 350);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '10px Arial';
    ctx.fillStyle = '#333';
    const yStep = maxValue / 5;
    for (let i = 0; i <= 5; i++) {
      const yValue = maxValue - i * yStep;
      ctx.fillText(Math.round(yValue), 30, 350 - i * (maxHeight / 5));
    }

    ctx.beginPath();
    ctx.moveTo(50, 350 - (data[0] / maxValue) * maxHeight);
    data.forEach((value, index) => {
      const x = (index + 1) * 100;
      const y = 350 - (value / maxValue) * maxHeight;
      ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#9b59b6';
    ctx.lineWidth = 2;
    ctx.stroke();

    data.forEach((value, index) => {
      const x = (index + 1) * 100;
      const y = 350 - (value / maxValue) * maxHeight;
      ctx.fillStyle = '#333';
      ctx.fillText(labels[index], x, y - 10);
    });

    ctx.fillStyle = '#9b59b6';
    ctx.font = '12px Arial';
    ctx.fillText('Jobs Completed Over Time', 10, 20);
  };

  const renderCharts = useCallback(() => {
    const pieCtx = pieCanvasRef.current.getContext('2d');
    drawPieChart(pieCtx, pieData, pieLabels);

    const barCtx = barCanvasRef.current.getContext('2d');
    drawBarChart(barCtx, barData, barLabels);

    const lineCtx = lineCanvasRef.current.getContext('2d');
    drawLineChart(lineCtx, lineData, lineLabels);
  }, [pieData, pieLabels, barData, barLabels, lineData, lineLabels]);

  const handleMouseMove = (e, canvasRef, chartType) => {
    const canvas = canvasRef.current;
    // eslint-disable-next-line no-unused-vars
    const rect = canvas.getBoundingClientRect();
    // eslint-disable-next-line no-unused-vars
    const mouseX = e.nativeEvent.offsetX;
    // eslint-disable-next-line no-unused-vars
    const mouseY = e.nativeEvent.offsetY;

    setTooltip({ show: false });

    // You can expand tooltip logic here if needed
  };

  useEffect(() => {
    renderCharts();
  }, [renderCharts]);

  // Function to capture dashboard and trigger download
  const handleDownload = () => {
    if (!dashboardRef.current) return;

    html2canvas(dashboardRef.current, { scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'KPI_Dashboard.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <>
      <div className="kpi-charts" ref={dashboardRef}>
        <h2>My KPIs</h2>
        <div className="kpi-boxes">
          <div className="kpi-box">Total Assigned: {jobs.length}</div>
          <div className="kpi-box">Completed: {completed}</div>
          <div className="kpi-box">Pending: {pending}</div>
          <div className="kpi-box">Upcoming This Week: {upcoming}</div>
        </div>
        <div className="chart-container">
          <div className="chart-row">
            <div className="chart-title-center">Job Status Distribution</div>
            <canvas
              ref={pieCanvasRef}
              width="400"
              height="400"
              className="chart"
              onMouseMove={(e) => handleMouseMove(e, pieCanvasRef, 'pie')}
            />
            <div className="chart-title-center">Defects Overview</div>
            <canvas
              ref={barCanvasRef}
              width="400"
              height="400"
              className="chart"
              onMouseMove={(e) => handleMouseMove(e, barCanvasRef, 'bar')}
            />
          </div>
          <div className="chart-row">
            <div className="chart-title-center">Job Completion Over Time</div>
            <canvas
              ref={lineCanvasRef}
              width="400"
              height="400"
              className="chart"
              onMouseMove={(e) => handleMouseMove(e, lineCanvasRef, 'line')}
            />
          </div>
          {tooltip.show && (
            <div className="tooltip" style={{ left: tooltip.x + 'px', top: tooltip.y + 'px' }}>
              {tooltip.text}
            </div>
          )}
        </div>
      </div>

      <button
        className="download-kpi-btn"
        onClick={handleDownload}
      >
        Download Dashboard as Image
      </button>
    </>
  );
};

export default PersonalKPICharts;
