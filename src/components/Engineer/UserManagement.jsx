import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('engineer');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(stored);
  }, []);

  const removeUser = (emailToRemove) => {
    const filtered = users.filter(u => u.email !== emailToRemove);
    setUsers(filtered);
    localStorage.setItem('users', JSON.stringify(filtered));
  };

  const addUser = (e) => {
    e.preventDefault();

    if (!email.trim()) return setError('Email is required.');
    if (!role.trim()) return setError('Role is required.');
    if (users.find(u => u.email === email.trim())) {
      return setError('User with this email already exists.');
    }

    const newUser = { email: email.trim(), role: role.toLowerCase() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setEmail('');
    setRole('engineer');
    setError('');
  };

  return (
    <div className="user-management-card">
      <h2>User Management</h2>

      <form className="add-user-form" onSubmit={addUser}>
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="inspector">Inspector</option>
          <option value="engineer">Engineer</option>
          <option value="manager">Manager</option>
        </select>

        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="user-list">
        {users.map(user => (
          <li key={user.email} className="user-entry">
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <span className={`user-role ${user.role.toLowerCase()}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
            <button onClick={() => removeUser(user.email)} className="remove-btn">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
