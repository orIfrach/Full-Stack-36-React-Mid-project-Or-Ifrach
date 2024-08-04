import React, { useState } from 'react';

const AddTodo = ({ onAddTodo, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo({ title });
  };

  return (
    <div style={{ border: '2px solid black', padding: '20px', width:'350px'}}>
      <h3 style={{ textAlign: 'left' }}>Add New Todo</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <button type="submit" style={{ marginRight: '10px' }} >Add</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
