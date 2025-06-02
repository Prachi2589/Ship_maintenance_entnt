import React, { useState, useEffect } from 'react';
import { useJobContext } from '../../contexts/JobContext'; 
import { useComponentsContext } from '../../contexts/ComponentsContext';
import { useShips } from '../../contexts/ShipContext';

const NotificationCenter = () => {
  const { jobs } = useJobContext();
  const { components } = useComponentsContext();
  const { ships } = useShips();

  const [notifications, setNotifications] = useState(
    (jobs || []).filter(
      (job) =>
        job.status === 'In Progress' ||
        job.status === 'Overdue' ||
        job.status === 'Completed' ||
        job.status === 'Open' ||
        job.status === 'Scheduled'
    )
  );

  useEffect(() => {
    setNotifications(
      (jobs || []).filter(
        (job) =>
          job.status === 'In Progress' ||
          job.status === 'Overdue' ||
          job.status === 'Completed' ||
          job.status === 'Open' ||
          job.status === 'Scheduled'
      )
    );
  }, [jobs]);

  const dismissNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Overdue':
        return 'red';
      case 'Open':
        return 'orange';
      case 'Scheduled':
        return 'gold';
      case 'In Progress':
        return 'dodgerblue';
      default:
        return 'gray';
    }
  };

  const getShipAndComponentDetails = (job) => {
    const ship = ships.find((s) => s.id === job.shipId);
    const component = components.find((c) => c.id === job.componentId);
    return {
      shipName: ship ? ship.name : 'Unknown Ship',
      componentName: component ? component.name : 'Unknown Component',
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', marginTop: '30px' }}>Notification Center</h2>
      {notifications.length === 0 ? (
        <p>No active notifications</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {notifications.map((notification) => {
            const { shipName, componentName } = getShipAndComponentDetails(notification);
            return (
              <div
                key={notification.id}
                style={{
                  backgroundColor: '#fff',
                  borderLeft: `8px solid ${getStatusColor(notification.status)}`,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  minWidth: '280px',
                  maxWidth: '320px',
                  flex: '1',
                }}
              >
                <h3 style={{ marginTop: 0 }}>{notification.type}</h3>
                <p><strong>Component:</strong> {componentName}</p>
                <p><strong>Ship:</strong> {shipName}</p>
                <p><strong>Status:</strong> {notification.status}</p>
                <p><strong>Scheduled Date:</strong> {notification.scheduledDate}</p>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#d32f2f')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#f44336')}
                >
                  Dismiss
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
