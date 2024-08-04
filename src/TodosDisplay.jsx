import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';

const TodosDisplay = ({ todos, user, onTodosCompletionChange }) => {
  const [todoList, setTodoList] = useState(todos);
  const [showAddTodo, setShowAddTodo] = useState(false);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const handleMarkCompleted = (id) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodoList(updatedTodos);

    // Check if all todos are completed and notify parent component
    const allCompleted = updatedTodos.every(todo => todo.completed);
    onTodosCompletionChange(allCompleted);
  };

  const handleAddTodo = (newTodo) => {
    const updatedTodos = [...todoList, { ...newTodo, id: todoList.length + 1, completed: false }];
    setTodoList(updatedTodos);
    setShowAddTodo(false);

    // Check if all todos are completed and notify parent component
    const allCompleted = updatedTodos.every(todo => todo.completed);
    onTodosCompletionChange(allCompleted);
  };

  return (
    <div 
      style={{
        border: '2px solid black',
        width: '420px',
        height: '330px',
        marginTop: '20px',
        overflowY: 'auto',
        padding: '10px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ paddingBottom: '10px', marginBottom: '10px' }}>Todos - User {user.id}</h4>
        <button onClick={() => setShowAddTodo(true)}>Add</button>
      </div>
      {showAddTodo ? (
        <AddTodo onAddTodo={handleAddTodo} onCancel={() => setShowAddTodo(false)} />
      ) : todoList.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} onMarkCompleted={handleMarkCompleted} />
        ))
      )}
    </div>
  );
};

export default TodosDisplay;
