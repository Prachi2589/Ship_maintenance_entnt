// src/contexts/JobContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const JobContext = createContext();

const defaultJobs = [
  {
    id: 'j1',
    componentId: 'c1',
    shipId: 's1',
    type: 'Inspection',
    priority: 'High',
    status: 'Open',
    assignedEngineerId: '3',
    scheduledDate: '2025-05-10', // today's date for testing
  },
  {
    id: 'j2',
    componentId: 'c2',
    shipId: 's2',
    type: 'Repair',
    priority: 'Low',
    status: 'Scheduled',
    assignedEngineerId: '3',
    scheduledDate: '2025-05-11',
  },
];

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Initialize from localStorage or fallback to defaultJobs
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      console.log("Loaded Jobs: ", JSON.parse(storedJobs));
      setJobs(JSON.parse(storedJobs));
    } else {
      console.log("Using default jobs");
      setJobs(defaultJobs);
      localStorage.setItem('jobs', JSON.stringify(defaultJobs));
    }
  }, []);

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
