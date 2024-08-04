import React from 'react';

const Todo = ({ todo, onMarkCompleted }) => {
  const handleMarkCompleted = () => {
    onMarkCompleted(todo.id);
  };

  return (
    <div style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
      <div>Title: {todo.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ flex: 1 }}>Completed: {todo.completed ? 'true' : 'false'}</div>
        {!todo.completed && (
          <button onClick={handleMarkCompleted}
            style={{ marginLeft: '10px', background: 'orange', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              Mark Completed</button>)}
      </div>
    </div>
  );
};

export default Todo;
