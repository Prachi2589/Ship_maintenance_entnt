import React, { useState, useEffect, useRef } from 'react';
import './EngineerDashboard.css';
import { useJobContext } from '../../contexts/JobContext';

import AssignedJobList from '../../components/Engineer/AssignedJobList';
import EngineerJobCalendar from '../../components/Engineer/EngineerJobCalendar';
import ComponentViewer from '../../components/Engineer/ComponentViewer';
import NotificationCenter from '../../components/Notifications/NotificationCenter';
import PersonalKPICharts from '../../components/Engineer/PersonalKPICharts';

const EngineerDashboard = () => {
  const { jobs } = useJobContext();
  const [notifications, setNotifications] = useState([]);
  const [activeSection, setActiveSection] = useState('kpi');
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // <-- Added for toggler
  const profileRef = useRef(null);

  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const engineerId = localStorage.getItem('userId');

  useEffect(() => {
    document.title = 'Engineer Dashboard';
  }, []);

  useEffect(() => {
    const fetchData = () => {
      setNotifications(JSON.parse(localStorage.getItem('notifications')) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfile]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/ENTNT_SHIP_MANAGEMENT/login';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'kpi':
        return <PersonalKPICharts engineerId={engineerId} jobs={jobs} />;
      case 'assignedJobs':
        return <AssignedJobList engineerId={engineerId} />;
      case 'calendar':
        return <EngineerJobCalendar engineerId={engineerId} />;
      case 'componentViewer':
        return <ComponentViewer engineerId={engineerId} />;
      case 'notifications':
        return (
          <NotificationCenter
            notifications={notifications}
            setNotifications={setNotifications}
            filterByEngineerId={engineerId}
          />
        );
      default:
        return <div>Invalid section</div>;
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="engineer-dashboard">
      <div className="top-bar">
        <h1 className="dashboard-title">Engineer Dashboard</h1>

        {/* Toggler button for small screens */}
        <button
          className="menu-toggler"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className={`top-bar-buttons ${showMenu ? 'show' : ''}`}>
          <button onClick={() => { setActiveSection('kpi'); setShowMenu(false); }}>KPI Charts</button>
          <button onClick={() => { setActiveSection('assignedJobs'); setShowMenu(false); }}>Assigned Jobs</button>
          <button onClick={() => { setActiveSection('calendar'); setShowMenu(false); }}>Job Calendar</button>
          <button onClick={() => { setActiveSection('componentViewer'); setShowMenu(false); }}>Component Viewer</button>
          <button onClick={() => { setActiveSection('notifications'); setShowMenu(false); }}>Notifications</button>
        </div>

        <div className="profile" ref={profileRef}>
          <div className="profile-icon" onClick={() => setShowProfile(!showProfile)}>
            👷
          </div>
          {showProfile && (
            <div className="profile-dropdown">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Role:</strong> {role}</p>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-body">
        <div className="content">{renderSection()}</div>
      </div>
    </div>
  );
};

export default EngineerDashboard;
