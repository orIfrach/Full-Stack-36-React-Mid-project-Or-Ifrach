import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Users from './Users';
import AddUser from './AddUser';
import TodosDisplay from './TodosDisplay';
import PostsDisplay from './PostsDisplay';

const App = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserTodos, setSelectedUserTodos] = useState([]);
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAllTodosCompleted, setIsAllTodosCompleted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() =>
    users.filter((user) => 
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
    ),
    [search, users]
  );

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setShowAddUser(false);
  };

  const handleSelectUser = async (userId) => {
    if (selectedUserId === userId) {
      // Deselect the user
      setSelectedUserId(null);
      setSelectedUserTodos([]);
      setSelectedUserPosts([]);
      setSelectedUser(null);
      setIsAllTodosCompleted(false);
    } else {
      setSelectedUserId(userId);
      try {
        const [todosResponse, postsResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`),
          axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        ]);

        setSelectedUserTodos(todosResponse.data);
        setSelectedUserPosts(postsResponse.data);

        // Find the selected user
        const selectedUserResponse = users.find(user => user.id === userId);
        setSelectedUser(selectedUserResponse);
        
        // Check if all todos are completed
        const allCompleted = todosResponse.data.every(todo => todo.completed);
        setIsAllTodosCompleted(allCompleted);
      } catch (error) {
        console.error('Error fetching todos or posts:', error);
      }
    }
  };

  const handleTodosCompletionChange = (allCompleted) => {
    setIsAllTodosCompleted(allCompleted);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    if (selectedUserId === userId) {
      // Clear selected user if deleted
      setSelectedUserId(null);
      setSelectedUserTodos([]);
      setSelectedUserPosts([]);
      setSelectedUser(null);
      setIsAllTodosCompleted(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '580px',
      marginTop: '20px',
      overflow: 'hidden'
    }}>
      <div style={{
        border: '2px solid black',
        borderRadius: '50px',
        width: '400px',
        height: '100%',
        overflowY: 'auto',
        padding: '10px',
        boxSizing: 'border-box'
      }}>
        <div>
          <div style={{ marginLeft: '80px' }}>
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button style={{ marginLeft: '60px' }} onClick={() => setShowAddUser(true)}>Add</button>
          </div>
          <Users
            users={filteredUsers}
            onSelectUser={handleSelectUser}
            onDeleteUser={handleDeleteUser}
            isAllTodosCompleted={selectedUserId ? isAllTodosCompleted : false}
          />
        </div>
        {showAddUser && (
          <div style={{ flex: 2.5, paddingLeft: '5px' }}>
            <AddUser onAddUser={handleAddUser} onCancel={() => setShowAddUser(false)} />
          </div>
        )}
      </div>
      {selectedUserId && selectedUser && (
        <div style={{ flex: 2.5, paddingLeft: '5px', display: 'flex', flexDirection: 'column' }}>
          <TodosDisplay todos={selectedUserTodos} user={selectedUser} onTodosCompletionChange={handleTodosCompletionChange} />
          <PostsDisplay posts={selectedUserPosts} user={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default App;
