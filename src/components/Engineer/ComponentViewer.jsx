// src/components/ComponentViewer.jsx
import React, { useContext } from 'react';
import { EngineerContext } from '../../contexts/EngineerContext'; // Import EngineerContext
import './ComponentViewer.css';

const ComponentViewer = () => {
  // Consume jobs and components from the EngineerContext
  const { components, jobs } = useContext(EngineerContext);

  // Filter components based on jobs
  const assignedJobComponentIds = [...new Set(jobs.map(job => job.componentId))];
  const assignedComponents = components.filter(comp => assignedJobComponentIds.includes(comp.id));

  return (
    <div className="component-viewer">
      <h2>Assigned Components</h2>
      <div className="component-list">
        {assignedComponents.map(component => (
          <div key={component.id} className="component-card">
            <h3>{component.name}</h3>
            <p><strong>Type:</strong> {component.type}</p>
            <p><strong>Description:</strong> {component.description}</p>
            <p><strong>Linked Ship ID:</strong> {component.shipId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentViewer;
