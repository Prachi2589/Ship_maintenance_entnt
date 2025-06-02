import React, { useState, useEffect, useRef } from 'react';
import './InspectorDashboard.css';
import { useJobContext } from '../../contexts/JobContext';

import InspectionManager from '../../components/ships/InspectionManager';
import ComponentInspection from '../../components/ComponentManagers/ComponentInspection';
import JobManager from '../../components/Jobs/JobManager';
import NotificationCenter from '../../components/Notifications/NotificationCenter';
import KPICharts from '../../components/KPICharts/KPIChart_Inspector';

import JobCalendar from '../../components/Calendar/JobCalendar';
import ShipCalendarView from '../../components/Calendar/ShipCalendarView';
import ComponentCalendarView from '../../components/Calendar/ComponentCalendarView';

const InspectorDashboard = () => {
  const { jobs, setJobs } = useJobContext();
  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeSection, setActiveSection] = useState('kpi');
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const profileRef = useRef(null);
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  useEffect(() => {
    document.title = 'Inspector Dashboard';
  }, []);

  useEffect(() => {
    const fetchData = () => {
      try {
        setShips(JSON.parse(localStorage.getItem('ships')) || []);
        setComponents(JSON.parse(localStorage.getItem('components')) || []);
        setNotifications(JSON.parse(localStorage.getItem('notifications')) || []);
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        setShips([]);
        setComponents([]);
        setNotifications([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ships', JSON.stringify(ships));
      localStorage.setItem('components', JSON.stringify(components));
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [ships, components, notifications]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/ENTNT_SHIP_MANAGEMENT/login';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sectionComponents = {
    kpi: <KPICharts ships={ships} components={components} jobs={jobs} />,
    inspectionManagement: (
      <div className="management-sections">
        <div className="management-card ship-card">
          <InspectionManager ships={ships} setShips={setShips} />
        </div>
        <div className="management-card component-card">
          <ComponentInspection
            ships={ships}
            components={components}
            setComponents={setComponents}
          />
        </div>
        <div className="management-card job-card">
          <JobManager
            jobs={jobs}
            setJobs={setJobs}
            ships={ships}
            components={components}
          />
        </div>
      </div>
    ),
    viewJobs: <JobCalendar />,
    viewShips: <ShipCalendarView ships={ships} />,
    viewComponents: <ComponentCalendarView components={components} />,
    notifications: (
      <NotificationCenter
        notifications={notifications}
        setNotifications={setNotifications}
      />
    ),
  };

  const renderSection = () => sectionComponents[activeSection] || <div>Invalid section</div>;

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="inspector-dashboard">
      <div className="top-bar">
        <div className="dashboard-title">Inspector Dashboard</div>

        {/* Profile Section */}
        <div className="profile-section" ref={profileRef}>
          <div className="profile-circle" onClick={() => setShowProfile(!showProfile)}>
            👤
          </div>
          {showProfile && (
            <div className="profile-dropdown">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Role:</strong> {role}</p>
              <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        {/* Hamburger Icon (moved below profile) */}
        <div className="hamburger" onClick={() => setDrawerOpen(!drawerOpen)}>
          ☰
        </div>

        {/* Navigation buttons (responsive) */}
        <div className={`nav-buttons ${drawerOpen ? 'open' : ''}`}>
          <button onClick={() => { setActiveSection('kpi'); setDrawerOpen(false); }}>KPI Charts</button>
          <button onClick={() => { setActiveSection('inspectionManagement'); setDrawerOpen(false); }}>Inspection Management</button>
          <button onClick={() => { setActiveSection('viewJobs'); setDrawerOpen(false); }}>Jobs</button>
          <button onClick={() => { setActiveSection('viewShips'); setDrawerOpen(false); }}>Ships</button>
          <button onClick={() => { setActiveSection('viewComponents'); setDrawerOpen(false); }}>Components</button>
          <button onClick={() => { setActiveSection('notifications'); setDrawerOpen(false); }}>Notifications</button>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default InspectorDashboard;
