// src/context/EngineerContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const EngineerContext = createContext();

export const EngineerProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [components, setComponents] = useState([]);
  const [ships, setShips] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Sample Users - updated with formal email addresses
    const sampleUsers = [
      { email: 'prachi.jain@entnt.in', role: 'engineer' },
      { email: 'emma.watson@entnt.in', role: 'engineer' },
      { email: 'hr@entnt.in', role: 'manager' },
      { email: "admin@entnt.in", role: "Admin" },
      { email: "inspector@entnt.in", role: "inspector" },
      { email: "engineer@entnt.in", role: "Engineer" },
    ];
    setUsers(sampleUsers);
    localStorage.setItem('users', JSON.stringify(sampleUsers));

    // Set default engineer email
    localStorage.setItem('email', 'engineer@entnt.in');

    // Sample Components
    const sampleComponents = [
      { id: 'c1', name: 'Propulsion System', type: 'Engine', description: 'Main engine module', shipId: 's1' },
      { id: 'c2', name: 'Radar Unit', type: 'Sensor', description: 'Long-range radar', shipId: 's2' },
      { id: 'c3', name: 'Life Support', type: 'Subsystem', description: 'Oxygen recycling system', shipId: 's1' }
    ];
    setComponents(sampleComponents);

    // Sample Ships
    const sampleShips = [
      { id: 's1', name: 'SS Falcon' },
      { id: 's2', name: 'USS Orion' }
    ];
    setShips(sampleShips);

    // Sample Jobs - assignedEngineerId updated to match formal email
    const sampleJobs = [
      {
        id: 'j1',
        componentId: 'c1',
        shipId: 's1',
        type: 'Maintenance',
        priority: 'High',
        status: 'In Progress',
        scheduledDate: '2025-05-12',
        assignedEngineerId: 'engineer@entnt.in'
      },
      {
        id: 'j2',
        componentId: 'c2',
        shipId: 's2',
        type: 'Inspection',
        priority: 'Medium',
        status: 'Not Started',
        scheduledDate: '2025-05-14',
        assignedEngineerId: 'engineer@entnt.in'
      },
      {
        id: 'j3',
        componentId: 'c3',
        shipId: 's1',
        type: 'Repair',
        priority: 'Low',
        status: 'Completed',
        scheduledDate: '2025-05-10',
        assignedEngineerId: 'engineer@entnt.in'
      }
    ];
    setJobs(sampleJobs);
    localStorage.setItem('jobs', JSON.stringify(sampleJobs));
  }, []);

  return (
    <EngineerContext.Provider value={{ jobs, setJobs, components, setComponents, ships, setShips, users, setUsers }}>
      {children}
    </EngineerContext.Provider>
  );
};
