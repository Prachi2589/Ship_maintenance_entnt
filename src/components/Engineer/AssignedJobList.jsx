// src/components/Jobs/AssignedJobList.jsx
import React, { useContext } from 'react';
import { EngineerContext } from '../../contexts/EngineerContext';
import './AssignedJobList.css';

const AssignedJobList = () => {
  const { jobs, setJobs, components, ships } = useContext(EngineerContext);
  const engineerId = localStorage.getItem('email');

  const handleStatusChange = (jobId, newStatus) => {
    const updatedJobs = jobs.map(job =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const getComponentName = (id) => {
    const comp = components.find(c => c.id === id);
    return comp ? comp.name : 'Unknown';
  };

  const getShipName = (id) => {
    const ship = ships.find(s => s.id === id);
    return ship ? ship.name : 'Unknown';
  };

  const assignedJobs = jobs.filter(job => job.assignedEngineerId === engineerId);

  return (
    <div className="assigned-job-list">
      <h2>Your Assigned Jobs</h2>
      {assignedJobs.length === 0 ? (
        <p>No jobs assigned to you.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Ship</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Scheduled Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedJobs.map(job => (
              <tr key={job.id}>
                <td>{getComponentName(job.componentId)}</td>
                <td>{getShipName(job.shipId)}</td>
                <td>{job.type}</td>
                <td>{job.priority}</td>
                <td>{job.status}</td>
                <td>{job.scheduledDate}</td>
                <td>
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Issue Found">Issue Found</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedJobList;
