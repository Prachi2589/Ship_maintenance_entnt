// components/jobs/JobManager.jsx
import React, { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../../utils/localStorageUtils';
import './JobManager.css';

const JobManager = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', shipId: '', engineer: '', status: '' });
  const [ships, setShips] = useState([]);
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    setJobs(loadFromStorage('jobs'));
    setShips(loadFromStorage('ships'));
    setEngineers(loadFromStorage('users').filter((user) => user.role === 'Engineer'));
  }, []);

  const handleAddJob = () => {
    const updatedJobs = [...jobs, { ...newJob, id: Date.now().toString(), date: new Date().toISOString() }];
    setJobs(updatedJobs);
    saveToStorage('jobs', updatedJobs);
    setNewJob({ title: '', shipId: '', engineer: '', status: '' });
  };

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    saveToStorage('jobs', updatedJobs);
  };

  return (
    <div>
      <h2>Job Management</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={newJob.title}
        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
      />
      <select
        value={newJob.shipId}
        onChange={(e) => setNewJob({ ...newJob, shipId: e.target.value })}
      >
        <option value="">Select Ship</option>
        {ships.map((ship) => (
          <option key={ship.id} value={ship.id}>
            {ship.name}
          </option>
        ))}
      </select>
      <select
        value={newJob.engineer}
        onChange={(e) => setNewJob({ ...newJob, engineer: e.target.value })}
      >
        <option value="">Assign Engineer</option>
        {engineers.map((engineer) => (
          <option key={engineer.id} value={engineer.id}>
            {engineer.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Status"
        value={newJob.status}
        onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
      />
      <button onClick={handleAddJob}>Add Job</button>

      <div className="table-wrapper">
        <table className="job-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ship ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.shipId}</td>
                <td>{job.type}</td>
                <td>{job.status}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteJob(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default JobManager;
