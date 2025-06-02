import React from 'react';
import './NotificationCenter.css';

const NotificationCenter = ({ notifications, userId }) => {
  const filtered = notifications.filter(n => n.userId === userId);

  return (
    <div className="notification-center">
      <h2>Notifications</h2>
      {filtered.length === 0 ? <p>No notifications</p> : (
        <ul>
          {filtered.map((n, idx) => (
            <li key={idx} className="notification-item">{n.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;