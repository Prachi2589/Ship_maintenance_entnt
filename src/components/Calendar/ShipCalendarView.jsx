import React from 'react';
import './ShipCalendar.css';
import { useShips } from '../../contexts/ShipContext';

const ShipCalendarView = () => {
  const { ships } = useShips();

  console.log("Ships in Context: ", ships);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'ship-priority-low';
      case 'Under Maintenance': return 'ship-priority-medium';
      default: return 'ship-priority-high';
    }
  };

  return (
    <div className="ship-calendar-container">
      <h2 className="calendar-title">Ships Overview</h2>

      <h3 className="section-heading">Scheduled Ships</h3>
      {ships.length > 0 ? (
        <table className="ship-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>IMO</th>
              <th>Flag</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship, index) => (
              <tr key={index} className={getStatusClass(ship.status)}>
                <td>{ship.name}</td>
                <td>{ship.imo}</td>
                <td>{ship.flag}</td>
                <td>{ship.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-ships-text">No ships available.</p>
      )}
    </div>
  );
};

export default ShipCalendarView;
