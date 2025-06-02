// src/components/Calendar/ComponentCalendarView.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useComponentsContext } from '../../contexts/ComponentsContext';
import './JobCalendar.css'; // You can use the same CSS for consistency

const ComponentCalendarView = () => {
  const { components } = useComponentsContext();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (dateObj) => dateObj.toLocaleDateString('en-CA');
  const selectedDate = formatDate(date);

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const componentsOnDate = components.filter(
    (component) => component.lastMaintenanceDate === selectedDate
  );

  return (
    <div className="job-calendar-container">
      <h2 className="calendar-title">🛠️ Component Calendar</h2>

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

      <h3 className="section-heading">Maintenance on {date.toDateString()}</h3>
      {componentsOnDate.length > 0 ? (
        <div className="table-container">{renderComponentTable(componentsOnDate)}</div>
      ) : (
        <p className="no-jobs-text">No components maintained on this date.</p>
      )}

      <h3 className="section-heading">All Components</h3>
      {components.length > 0 ? (
        <div className="table-container">{renderComponentTable(components)}</div>
      ) : (
        <p className="no-jobs-text">No components available.</p>
      )}
    </div>
  );
};

const renderComponentTable = (componentList) => (
  <table className="job-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Ship ID</th>
        <th>Name</th>
        <th>Serial Number</th>
        <th>Install Date</th>
        <th>Last Maintenance</th>
      </tr>
    </thead>
    <tbody>
      {componentList.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.id}</td>
          <td>{comp.shipId}</td>
          <td>{comp.name}</td>
          <td>{comp.serialNumber}</td>
          <td>{comp.installDate}</td>
          <td>{comp.lastMaintenanceDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ComponentCalendarView;
