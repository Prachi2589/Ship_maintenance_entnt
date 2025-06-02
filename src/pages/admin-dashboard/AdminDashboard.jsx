// src/pages/admin-dashboard/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import './AdminDashboard.css';
import { useJobContext } from '../../contexts/JobContext';

import ShipManager from '../../components/ships/ShipManager';
import ComponentManager from '../../components/ComponentManagers/ComponentManager';
import JobManager from '../../components/Jobs/JobManager';
import NotificationCenter from '../../components/Notifications/NotificationCenter';
import KPICharts from '../../components/KPICharts/KPICharts';

import JobCalendar from '../../components/Calendar/JobCalendar';
import ShipCalendarView from '../../components/Calendar/ShipCalendarView';
import ComponentCalendarView from '../../components/Calendar/ComponentCalendarView';
import UserManagement from '../../components/Engineer/UserManagement';

const AdminDashboard = () => {
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

  const safeParse = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    document.title = 'Admin Dashboard';
  }, []);

  useEffect(() => {
    setShips(safeParse('ships'));
    setComponents(safeParse('components'));
    setNotifications(safeParse('notifications'));
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection) setActiveSection(savedSection);
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('ships', JSON.stringify(ships));
  }, [ships]);

  useEffect(() => {
    localStorage.setItem('components', JSON.stringify(components));
  }, [components]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('ships');
    localStorage.removeItem('components');
    localStorage.removeItem('notifications');
    localStorage.removeItem('activeSection');
    window.location.href = '/ENTNT_SHIP_MANAGEMENT/login';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setDrawerOpen(false);
  };

  const handleKeyDownSection = (e, section) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSectionChange(section);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'kpi':
        return <KPICharts ships={ships} components={components} jobs={jobs} />;
      case 'management':
        return (
          <div className="management-sections">
            <div className="management-card ship-card">
              <ShipManager ships={ships} setShips={setShips} />
            </div>
            <div className="management-card component-card">
              <ComponentManager
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
        );
      case 'viewJobs':
        return <JobCalendar />;
      case 'viewShips':
        return <ShipCalendarView ships={ships} />;
      case 'viewComponents':
        return <ComponentCalendarView components={components} />;
      case 'notifications':
        return (
          <NotificationCenter
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      case 'userManagement':
        return <UserManagement />;
      default:
        return <div>Invalid section</div>;
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <div className="topbar">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        <button
          className="menu-toggler"
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label="Toggle menu"
          aria-expanded={drawerOpen}
          aria-controls="sidebar"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setDrawerOpen(!drawerOpen);
          }}
        >
          &#9776;
        </button>

        <div
          className="profile-section"
          ref={profileRef}
        >
          <div
            className="profile-circle"
            onClick={() => setShowProfile(!showProfile)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowProfile(!showProfile);
              }
            }}
            aria-haspopup="true"
            aria-expanded={showProfile}
            aria-controls="profile-dropdown"
            role="button"
          >
            👤
          </div>
          {showProfile && (
            <div
              className="profile-dropdown"
              id="profile-dropdown"
              role="menu"
              aria-label="User profile options"
            >
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Role:</strong> {role}</p>
              <button
                className="logout"
                onClick={handleLogout}
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        id="sidebar"
        className={`sidebar-buttons ${drawerOpen ? 'open' : ''}`}
        aria-label="Primary navigation"
      >
        {[
          { id: 'kpi', label: 'KPI Charts' },
          { id: 'management', label: 'Management' },
          { id: 'viewJobs', label: 'Jobs' },
          { id: 'viewShips', label: 'Ships' },
          { id: 'viewComponents', label: 'Components' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'userManagement', label: 'User Access' }
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleSectionChange(id)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDownSection(e, id)}
            aria-current={activeSection === id ? 'page' : undefined}
          >
            {label}
          </button>
        ))}
      </aside>

      <div className="content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
