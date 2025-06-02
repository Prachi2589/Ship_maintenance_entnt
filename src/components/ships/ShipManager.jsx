// components/ships/ShipManager.jsx
import React, { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../../utils/localStorageUtils';
import './ShipManager.css';

const ShipManager = () => {
  const [ships, setShips] = useState([]);
  const [newShip, setNewShip] = useState({ name: '', imo: '', status: '' });

  useEffect(() => {
    const storedShips = loadFromStorage('ships');
    setShips(storedShips);
  }, []);

  const handleAddShip = () => {
    const updatedShips = [...ships, { ...newShip, id: Date.now().toString() }];
    setShips(updatedShips);
    saveToStorage('ships', updatedShips);
    setNewShip({ name: '', imo: '', status: '' });
  };

  const handleDeleteShip = (id) => {
    const updatedShips = ships.filter((ship) => ship.id !== id);
    setShips(updatedShips);
    saveToStorage('ships', updatedShips);
  };

  return (
    <div>
      <h2>Ship Management</h2>
      <input
        type="text"
        placeholder="Name"
        value={newShip.name}
        onChange={(e) => setNewShip({ ...newShip, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="IMO"
        value={newShip.imo}
        onChange={(e) => setNewShip({ ...newShip, imo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={newShip.status}
        onChange={(e) => setNewShip({ ...newShip, status: e.target.value })}
      />
      <button onClick={handleAddShip}>Add Ship</button>
      <table className="ship-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IMO</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship) => (
            <tr key={ship.id}>
              <td>{ship.name}</td>
              <td>{ship.imo}</td>
              <td>{ship.status}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteShip(ship.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ShipManager;
