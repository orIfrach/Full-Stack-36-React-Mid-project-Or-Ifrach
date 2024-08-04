import React, { useState } from 'react';

const AddUser = ({ onAddUser, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ name, email });
  };

  return (
    <div style={{ border: '2px solid black', padding: '20px', width:'350px'}}>
      <h3 style={{ textAlign: 'left' }}>Add New User</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <button type="submit" style={{ marginRight: '10px' }} >Add User</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
