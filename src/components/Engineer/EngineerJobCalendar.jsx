import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EngineerJobCalendar.css';
import { EngineerContext } from '../../contexts/EngineerContext';

// Function to format the date in 'YYYY-MM-DD' format using the 'en-CA' locale
const formatDate = (dateObj) => dateObj.toLocaleDateString('en-CA');

const EngineerJobCalendar = () => {
  const { jobs, components, ships } = useContext(EngineerContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);  // State to toggle calendar visibility
  const engineerId = localStorage.getItem('email');

  // Handle date change and format it to 'YYYY-MM-DD' format
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);  // Format date using the helper function
    setSelectedDate(formattedDate);
    setShowCalendar(false);  // Hide calendar after date selection
  };

  // Filter jobs assigned to the engineer
  const engineerJobs = jobs.filter(job => job.assignedEngineerId === engineerId);
  
  // Filter jobs for the selected date
  const jobsOnDate = engineerJobs.filter(job => job.scheduledDate === selectedDate);

  // Get the appropriate tile class based on the job's status
  const getTileClassName = ({ date }) => {
    const dateStr = formatDate(date);  // Format the date to match the selected date format
    const jobOnThisDate = engineerJobs.find(job => job.scheduledDate === dateStr);
    if (!jobOnThisDate) return null;

    switch (jobOnThisDate.status) {
      case 'Completed':
        return 'status-completed';
      case 'In Progress':
        return 'status-in-progress';
      case 'Issue Found':
        return 'status-issue';
      case 'Delayed':
        return 'status-delayed';
      default:
        return 'status-pending';
    }
  };

  // Get component name by its ID
  const getComponentName = (id) => {
    const comp = components.find(c => c.id === id);
    return comp ? comp.name : 'Unknown';
  };

  // Get ship name by its ID
  const getShipName = (id) => {
    const ship = ships.find(s => s.id === id);
    return ship ? ship.name : 'Unknown';
  };

  return (
    <div className="engineer-job-calendar">
      <h2>Your Job Calendar</h2>

      {/* Button to toggle calendar visibility */}
      <button 
        onClick={() => setShowCalendar(prev => !prev)} 
        className="select-date-btn"
      >
        {showCalendar ? 'Hide Calendar' : 'Select Date'}
      </button>

      {/* Show calendar only if showCalendar is true */}
      {showCalendar && (
        <Calendar
          onChange={handleDateChange}
          tileClassName={getTileClassName}
        />
      )}

      {/* Display jobs for the selected date */}
      {selectedDate && (
        <div className="job-list-on-date">
          <h3>Jobs on {selectedDate}</h3>
          {jobsOnDate.length === 0 ? (
            <p>No jobs scheduled on this date.</p>
          ) : (
            <ul>
              {jobsOnDate.map(job => (
                <li key={job.id}>
                  <strong>{job.type}</strong> on <em>{getShipName(job.shipId)}</em> → 
                  Component: {getComponentName(job.componentId)} | 
                  Priority: {job.priority} | 
                  Status: {job.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default EngineerJobCalendar;
