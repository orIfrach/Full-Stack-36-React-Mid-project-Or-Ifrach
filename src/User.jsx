import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ user, onSelectUser, onDeleteUser, isAllTodosCompleted }) => {
  const [todos, setTodos] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [editableUser, setEditableUser] = useState({
    ...user,
    address: user.address || { street: '', city: '', zipcode: '' }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
        const userTodos = response.data;
        setTodos(userTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [user.id]);

  // Update border color based on todos and selection
  const borderColor = isSelected ? (isAllTodosCompleted ? 'green':'red') : 'red';

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSelectUser = () => {
    setIsSelected(!isSelected);
    onSelectUser(user.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prevUser) => {
      if (name in prevUser.address) {
        return {
          ...prevUser,
          address: { ...prevUser.address, [name]: value },
        };
      }
      return { ...prevUser, [name]: value };
    });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editableUser.id}`, editableUser);
      console.log('Updated User:', response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${editableUser.id}`);
      console.log('Deleted User:', editableUser.id);
      onDeleteUser(editableUser.id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div
      style={{
        border: `3px solid ${borderColor}`,
        padding: '10px',
        marginBottom: '10px',
        width: '300px',
        transition: 'all 0.3s ease',
        backgroundColor: isSelected ? 'orange' : 'white',
      }}
    >
      <div>
        <div onClick={handleSelectUser} style={{ cursor: 'pointer', marginBottom: '5px' }}>
          Id: {user.id}
        </div>
        Name:{' '}
        <input
          type="text" name="name" value={editableUser.name || ''} onChange={handleInputChange}
          style={{ width: '80%', marginBottom: '10px' }}
        />
        Email:{' '}
        <input
          type="text" name="email" value={editableUser.email || ''} onChange={handleInputChange}
          style={{ width: '80%', marginBottom: '10px' }}
        />
      </div>

      {showDetails && (
        <div style={{ border: '2px solid black', borderRadius: '10px', marginTop: '10px', padding: '10px' }}>
          Street:{' '}
          <input
            type="text" name="street" value={editableUser.address.street || ''} onChange={handleInputChange}
            style={{ width: '80%', marginBottom: '10px' }}
          />
          City:{' '}
          <input
            type="text" name="city" value={editableUser.address.city || ''} onChange={handleInputChange}
            style={{ width: '82%', marginBottom: '10px' }}
          />
          Zipcode:{' '}
          <input type="text" name="zipcode"
            value={editableUser.address.zipcode || ''}
            onChange={handleInputChange}
            style={{ width: '75%', marginBottom: '10px' }} />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handleToggleDetails}
        onMouseOver={() => setShowDetails(true)}>
          Other data
        </button>
        <div>
          <button onClick={handleUpdate} style={{ background: 'orange', padding: '5px 10px', cursor: 'pointer' }}
            disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
          <button onClick={handleDelete}
            style={{ marginLeft: '10px', background: 'orange', padding: '5px 10px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
