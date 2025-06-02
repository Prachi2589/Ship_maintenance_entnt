import React, { useState, useEffect, useContext } from 'react';
import { InspectionContext } from '../../contexts/InspectionContext'; // Import the context
import './InspectionManager.css';

const InspectionManager = ({ ships, setShips }) => {
  const { inspections, setInspections } = useContext(InspectionContext); // Get data from context
  const [newInspection, setNewInspection] = useState({
    ship: '',
    component: '',
    scheduledDate: '',
    status: 'pending',
  });
  const [selectedInspection, setSelectedInspection] = useState(null);

  useEffect(() => {
    // This effect could be used to load inspections if they are fetched from an API in the future
    // or initialized with default data.
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInspection((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddInspection = () => {
    const updatedInspections = [
      ...inspections,
      { id: inspections.length + 1, ...newInspection },
    ];
    setInspections(updatedInspections); // Update context state
    setNewInspection({ ship: '', component: '', scheduledDate: '', status: 'pending' }); // Reset form
  };

  const handleUpdateInspectionStatus = (inspectionId, status) => {
    const updatedInspections = inspections.map((inspection) => {
      if (inspection.id === inspectionId) {
        return { ...inspection, status };
      }
      return inspection;
    });
    setInspections(updatedInspections); // Update context state
  };

  const handleSelectInspection = (inspection) => {
    setSelectedInspection(inspection);
  };

  return (
    <div className="inspection-manager">
      <h2>Inspection Manager</h2>

      {/* Add New Inspection Form */}
      <div className="new-inspection-form">
        <h3>Add New Inspection</h3>
        <div>
          <label>Ship:</label>
          <select
            name="ship"
            value={newInspection.ship}
            onChange={handleInputChange}
          >
            <option value="">Select Ship</option>
            {ships.map((ship) => (
              <option key={ship.id} value={ship.name}>
                {ship.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Component:</label>
          <input
            type="text"
            name="component"
            value={newInspection.component}
            onChange={handleInputChange}
            placeholder="Enter component name"
          />
        </div>
        <div>
          <label>Scheduled Date:</label>
          <input
            type="date"
            name="scheduledDate"
            value={newInspection.scheduledDate}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddInspection}>Add Inspection</button>
      </div>

      {/* Inspection List */}
      <div className="inspection-list">
        <h3>Existing Inspections</h3>
        <table>
          <thead>
            <tr>
              <th>Ship</th>
              <th>Component</th>
              <th>Scheduled Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((inspection, index) => (
              <tr key={inspection.id} onClick={() => handleSelectInspection(inspection)}>
                <td>{inspection.ship}</td>
                <td>{inspection.component}</td>
                <td>{inspection.scheduledDate}</td>
                <td>{inspection.status}</td>
                <td>
                  <button onClick={() => handleUpdateInspectionStatus(inspection.id, 'in progress')}>
                    Mark In Progress
                  </button>
                  <button onClick={() => handleUpdateInspectionStatus(inspection.id, 'completed')}>
                    Mark Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspection Details */}
      {selectedInspection && (
        <div className="inspection-details">
          <h3>Inspection Details</h3>
          <p><strong>Ship:</strong> {selectedInspection.ship}</p>
          <p><strong>Component:</strong> {selectedInspection.component}</p>
          <p><strong>Scheduled Date:</strong> {selectedInspection.scheduledDate}</p>
          <p><strong>Status:</strong> {selectedInspection.status}</p>
        </div>
      )}
    </div>
  );
};

export default InspectionManager; // Corrected export
