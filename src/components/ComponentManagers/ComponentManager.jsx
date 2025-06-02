import React, { useState } from 'react';
import { useComponentsContext } from '../../contexts/ComponentsContext';
import './ComponentManager.css';

const ComponentManager = () => {
  const { components, setComponents } = useComponentsContext();
  const [newComponent, setNewComponent] = useState({ name: '', shipId: '', status: '' });

  const handleAddComponent = () => {
    if (!newComponent.name || !newComponent.shipId || !newComponent.status) return;

    const updatedComponents = [
      ...components,
      { ...newComponent, id: Date.now().toString() }
    ];
    setComponents(updatedComponents);
    localStorage.setItem('components', JSON.stringify(updatedComponents));
    setNewComponent({ name: '', shipId: '', status: '' });
  };

  const handleDeleteComponent = (id) => {
    const updatedComponents = components.filter((comp) => comp.id !== id);
    setComponents(updatedComponents);
    localStorage.setItem('components', JSON.stringify(updatedComponents));
  };

  return (
    <div className="component-manager">
      <h2>Component Management</h2>

      <div className="component-form">
        <input
          type="text"
          placeholder="Component Name"
          value={newComponent.name}
          onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
        />

        <select
          value={newComponent.shipId}
          onChange={(e) => setNewComponent({ ...newComponent, shipId: e.target.value })}
        >
          <option value="">Select Ship</option>
          <option value="SHIP-001">SHIP-001</option>
          <option value="SHIP-002">SHIP-002</option>
          <option value="SHIP-003">SHIP-003</option>
        </select>

        <input
          type="text"
          placeholder="Status"
          value={newComponent.status}
          onChange={(e) => setNewComponent({ ...newComponent, status: e.target.value })}
        />

        <button onClick={handleAddComponent}>Add Component</button>
      </div>

      <table className="component-table">
        <thead>
          <tr>
            <th>Component Name</th>
            <th>Status</th>
            <th>Ship ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.map((comp) => (
            <tr key={comp.id}>
              <td>{comp.name}</td>
              <td>{comp.status || '—'}</td>
              <td>{comp.shipId}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteComponent(comp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {components.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No components available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentManager;
