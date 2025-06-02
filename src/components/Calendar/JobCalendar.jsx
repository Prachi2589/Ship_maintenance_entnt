import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useJobContext } from '../../contexts/JobContext';
import './JobCalendar.css';

const JobCalendar = () => {
  const { jobs } = useJobContext();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (dateObj) => dateObj.toLocaleDateString('en-CA');
  const selectedDate = formatDate(date);

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const jobsOnDate = jobs.filter((job) => job.scheduledDate === selectedDate);

  const getPriorityClass = (priority) => {
    if (typeof priority !== 'string' || !priority) {
      return '';  // return empty string if priority is not valid
    }

    switch (priority.toLowerCase()) {
      case 'high': return 'job-priority-high';
      case 'medium': return 'job-priority-medium';
      case 'low': return 'job-priority-low';
      default: return '';
    }
  };


  return (
    <div className="job-calendar-container">
      <h2 className="calendar-title">📅 Job Calendar</h2>

      <div className="date-picker">
        <label>Select a Date:</label>
        <input
          type="text"
          readOnly
          value={selectedDate}
          onClick={toggleCalendar}
          className="date-input"
        />
        {showCalendar && (
          <div className="calendar-popup">
            <Calendar onChange={(d) => { setDate(d); setShowCalendar(false); }} value={date} />
          </div>
        )}
      </div>

      <h3 className="section-heading">Jobs on {date.toDateString()}</h3>
      {jobsOnDate.length > 0 ? (
        <div className="table-container">{renderTable(jobsOnDate, getPriorityClass)}</div>
      ) : (
        <p className="no-jobs-text">No jobs scheduled on this date.</p>
      )}

      <h3 className="section-heading">All Jobs</h3>
      {jobs.length > 0 ? (
        <div className="table-container">{renderTable(jobs, getPriorityClass)}</div>
      ) : (
        <p className="no-jobs-text">No jobs available.</p>
      )}
    </div>
  );
};

const renderTable = (jobList, getPriorityClass) => (
  <table className="job-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Component ID</th>
        <th>Ship ID</th>
        <th>Type</th>
        <th>Priority</th>
        <th>Status</th>
        <th>Assigned Engineer ID</th>
        <th>Scheduled Date</th>
      </tr>
    </thead>
    <tbody>
      {jobList.map((job) => (
        <tr key={job.id} className={getPriorityClass(job.priority)}>
          <td>{job.id}</td>
          <td>{job.componentId}</td>
          <td>{job.shipId}</td>
          <td>{job.type}</td>
          <td>{job.priority}</td>
          <td>{job.status}</td>
          <td>{job.assignedEngineerId}</td>
          <td>{job.scheduledDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default JobCalendar;
